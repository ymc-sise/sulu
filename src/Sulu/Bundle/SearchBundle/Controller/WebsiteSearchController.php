<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\SearchBundle\Controller;

use Massive\Bundle\SearchBundle\Search\SearchManagerInterface;
use Sulu\Bundle\WebsiteBundle\Resolver\ParameterResolverInterface;
use Sulu\Bundle\WebsiteBundle\Resolver\TemplateAttributeResolverInterface;
use Sulu\Component\Rest\RequestParametersTrait;
use Sulu\Component\Webspace\Analyzer\RequestAnalyzerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Twig\Environment;

/**
 * This controller handles the search for the website.
 */
class WebsiteSearchController
{
    use RequestParametersTrait;

    /**
     * @var SearchManagerInterface
     */
    private $searchManager;

    /**
     * @var RequestAnalyzerInterface
     */
    private $requestAnalyzer;

    /**
     * @var ParameterResolverInterface
     */
    private $parameterResolver;

    /**
     * @var Environment
     */
    private $twig;

    /**
     * @var string[]
     */
    private $indexes;

    /**
     * @var TemplateAttributeResolverInterface|null
     */
    private $templateAttributeResolver;

    public function __construct(
        SearchManagerInterface $searchManager,
        RequestAnalyzerInterface $requestAnalyzer,
        ParameterResolverInterface $parameterResolver,
        Environment $twig,
        array $indexes = [],
        ?TemplateAttributeResolverInterface $templateAttributeResolver = null
    ) {
        $this->searchManager = $searchManager;
        $this->requestAnalyzer = $requestAnalyzer;
        $this->parameterResolver = $parameterResolver;
        $this->twig = $twig;
        $this->indexes = $indexes;
        $this->templateAttributeResolver = $templateAttributeResolver;

        if (null === $this->templateAttributeResolver) {
            @\trigger_error(
                'Instantiating the WebsiteSearchController class without the $templateAttributeResolver argument is deprecated.',
                \E_USER_DEPRECATED
            );
        }
    }

    /**
     * Returns the search results for the given query.
     *
     * @return Response
     */
    public function queryAction(Request $request)
    {
        $query = $this->getRequestParameter($request, 'q', false, '');

        $locale = $this->requestAnalyzer->getCurrentLocalization()->getLocale();
        $webspace = $this->requestAnalyzer->getWebspace();

        $queryString = '';
        if (\strlen($query) < 3) {
            $queryString .= '+("' . self::escapeDoubleQuotes($query) . '") ';
        } else {
            $queryValues = \explode(' ', $query);
            foreach ($queryValues as $queryValue) {
                if (\strlen($queryValue) > 2) {
                    $queryString .= '+("' . self::escapeDoubleQuotes($queryValue) . '" OR ' .
                        \preg_replace('/([^\pL\s\d])/u', '?', $queryValue) . '* OR ' .
                        \preg_replace('/([^\pL\s\d])/u', '', $queryValue) . '~) ';
                } else {
                    $queryString .= '+("' . self::escapeDoubleQuotes($queryValue) . '") ';
                }
            }
        }

        $hits = $this->searchManager
            ->createSearch($queryString)
            ->locale($locale)
            ->indexes(
                \str_replace(
                    '#webspace#',
                    $webspace->getKey(),
                    $this->indexes
                )
            )
            ->execute();

        $template = $webspace->getTemplate('search', $request->getRequestFormat());

        if (!$this->twig->getLoader()->exists($template)) {
            throw new NotFoundHttpException();
        }

        $parameters = ['query' => $query, 'hits' => $hits];

        if ($this->templateAttributeResolver) {
            $parameters = $this->templateAttributeResolver->resolve($parameters);
        } else {
            $parameters = $this->parameterResolver->resolve($parameters, $this->requestAnalyzer);
        }

        $response = new Response($this->twig->render($template, $parameters));

        // we need to set the content type ourselves here
        // else symfony will use the accept header of the client and the page could be cached with false content-type
        // see following symfony issue: https://github.com/symfony/symfony/issues/35694
        $mimeType = $request->getMimeType($request->getRequestFormat());
        if ($mimeType) {
            $response->headers->set('Content-Type', $mimeType);
        }

        return $response;
    }

    /**
     * Returns the string with escaped quotes.
     *
     * @param string $query
     *
     * @return string
     */
    private static function escapeDoubleQuotes($query)
    {
        return \str_replace('"', '\\"', $query);
    }
}
