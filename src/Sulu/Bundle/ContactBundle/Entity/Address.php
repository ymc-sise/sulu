<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\ContactBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Address
 * @ExclusionPolicy("all");
 */
class Address
{
    /**
     * @var string
     * @Expose
     */
    private $street;

    /**
     * @var string
     * @Expose
     */
    private $number;

    /**
     * @var string
     * @Expose
     */
    private $addition;

    /**
     * @var string
     * @Expose
     */
    private $zip;

    /**
     * @var string
     * @Expose
     */
    private $city;

    /**
     * @var string
     * @Expose
     */
    private $state;

    /**
     * @var integer
     * @Expose
     */
    private $id;

    /**
     * @var \Sulu\Bundle\ContactBundle\Entity\AddressType
     * @Expose
     */
    private $addressType;

    /**
     * @var \Sulu\Bundle\ContactBundle\Entity\Country
     * @Expose
     */
    private $country;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $contacts;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $accounts;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->contacts = new \Doctrine\Common\Collections\ArrayCollection();
        $this->accounts = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set street
     *
     * @param string $street
     * @return Address
     */
    public function setStreet($street)
    {
        $this->street = $street;

        return $this;
    }

    /**
     * Get street
     *
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set number
     *
     * @param string $number
     * @return Address
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return string
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set addition
     *
     * @param string $addition
     * @return Address
     */
    public function setAddition($addition)
    {
        $this->addition = $addition;

        return $this;
    }

    /**
     * Get addition
     *
     * @return string
     */
    public function getAddition()
    {
        return $this->addition;
    }

    /**
     * Set zip
     *
     * @param string $zip
     * @return Address
     */
    public function setZip($zip)
    {
        $this->zip = $zip;

        return $this;
    }

    /**
     * Get zip
     *
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return Address
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set state
     *
     * @param string $state
     * @return Address
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set addressType
     *
     * @param \Sulu\Bundle\ContactBundle\Entity\AddressType $addressType
     * @return Address
     */
    public function setAddressType(\Sulu\Bundle\ContactBundle\Entity\AddressType $addressType)
    {
        $this->addressType = $addressType;

        return $this;
    }

    /**
     * Get addressType
     *
     * @return \Sulu\Bundle\ContactBundle\Entity\AddressType
     */
    public function getAddressType()
    {
        return $this->addressType;
    }

    /**
     * Set country
     *
     * @param \Sulu\Bundle\ContactBundle\Entity\Country $country
     * @return Address
     */
    public function setCountry(\Sulu\Bundle\ContactBundle\Entity\Country $country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return \Sulu\Bundle\ContactBundle\Entity\Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Add contacts
     *
     * @param \Sulu\Bundle\ContactBundle\Entity\Contact $contacts
     * @return Address
     */
    public function addContact(\Sulu\Bundle\ContactBundle\Entity\Contact $contacts)
    {
        $this->contacts[] = $contacts;

        return $this;
    }

    /**
     * Remove contacts
     *
     * @param \Sulu\Bundle\ContactBundle\Entity\Contact $contacts
     */
    public function removeContact(\Sulu\Bundle\ContactBundle\Entity\Contact $contacts)
    {
        $this->contacts->removeElement($contacts);
    }

    /**
     * Get contacts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getContacts()
    {
        return $this->contacts;
    }

    /**
     * Add accounts
     *
     * @param \Sulu\Bundle\ContactBundle\Entity\Account $accounts
     * @return Address
     */
    public function addAccount(\Sulu\Bundle\ContactBundle\Entity\Account $accounts)
    {
        $this->accounts[] = $accounts;

        return $this;
    }

    /**
     * Remove accounts
     *
     * @param \Sulu\Bundle\ContactBundle\Entity\Account $accounts
     */
    public function removeAccount(\Sulu\Bundle\ContactBundle\Entity\Account $accounts)
    {
        $this->accounts->removeElement($accounts);
    }

    /**
     * Get accounts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAccounts()
    {
        return $this->accounts;
    }
}