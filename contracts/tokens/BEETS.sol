// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BeethovenxToken is ERC20("BeethovenxToken", "BEETS"), Ownable {
    uint256 public constant MAX_SUPPLY = 250_000_000e18; // 250 million beets

    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner (MasterChef).
    function mint(address _to, uint256 _amount) public onlyOwner {
        require(totalSupply() + _amount <= MAX_SUPPLY, "BEETS::mint: cannot exceed max supply");
        _mint(_to, _amount);
    }
}