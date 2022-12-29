//SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

contract catstore {
    mapping(string => uint256) public nameofcatbreedstonoofcatbreeds;

    uint256 noofcatbreeds;

    Vetshop[] public vetshop;

    struct Vetshop {
        uint256 noofcatbreeds;
        string nameofcatbreeds;
    }

    function storenoofcatbreeds(uint256 _noofcatbreeds) public virtual {
        noofcatbreeds = _noofcatbreeds;
    }

    function readnoofcatbreeds() public view returns (uint256) {
        return noofcatbreeds;
    }

    //grouping
    function catbreedsgrouped(
        string memory _nameofcatbreeds,
        uint256 _noofcatbreeds
    ) public {
        Vetshop memory newcatbreedsgrouped = Vetshop({
            noofcatbreeds: _noofcatbreeds,
            nameofcatbreeds: _nameofcatbreeds
        });
        vetshop.push(newcatbreedsgrouped);
        nameofcatbreedstonoofcatbreeds[_nameofcatbreeds] = _noofcatbreeds;
    }
}
