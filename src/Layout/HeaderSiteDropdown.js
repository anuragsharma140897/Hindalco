import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Button, Dropdown } from 'rizzui'

function HeaderSiteDropdown() {
    return (
        <Dropdown >
            <Dropdown.Trigger>
                <Button
                    as="span"
                    variant="outline"
            
                >
                    Belgavi  <FaChevronDown className='ml-5' />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
                <Dropdown.Item>Belgavi one</Dropdown.Item>
                <Dropdown.Item>Belgavi two</Dropdown.Item>
                <Dropdown.Item>Belgavi three</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default HeaderSiteDropdown