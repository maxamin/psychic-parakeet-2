## [M-1] Functions could lead to a possible DOS attack and use alot of gas if user attempts to claim alot of rounds

**Occurences**:

- `MerginPool::claimRewards` at line 140, MergingPool.sol
- `RankedBattle::claimNRN` at line 296, RankedBattle.sol

**Impact**:
If player attempts to claim alot of rewards e.g if current roundId is 700 and lowerBound is 5, the loop can run for along time and get very expensive to run, potentially causing a DOS.
https://docs.soliditylang.org/en/latest/security-considerations.html#gas-limit-and-loops

**Proof Of Code**:

```javascript
    function claimRewards(
        string[] calldata modelURIs,
        string[] calldata modelTypes,
        uint256[2][] calldata customAttributes
    )
        external
    {
        uint256 winnersLength;
        uint32 claimIndex = 0;
        uint32 lowerBound = numRoundsClaimed[msg.sender];
        for (uint32 currentRound = lowerBound; currentRound < roundId; currentRound++) {
            numRoundsClaimed[msg.sender] += 1;
            winnersLength = winnerAddresses[currentRound].length;
            for (uint32 j = 0; j < winnersLength; j++) {
                if (msg.sender == winnerAddresses[currentRound][j]) {
                    _fighterFarmInstance.mintFromMergingPool(
                        msg.sender,
                        modelURIs[claimIndex],
                        modelTypes[claimIndex],
                        customAttributes[claimIndex]
                    );
                    claimIndex += 1;
                }
            }
        }
        if (claimIndex > 0) {
            emit Claimed(msg.sender, claimIndex);
        }
    }
```

**Recommended Mitigation:**

1.The user should be forced to claim a certain range of rounds i.e 2-30 etc and not all at a time.

## [M-2] Totalpoints at `MergingPool::pickWinner` could underflow at the first round where total points is still 0;

**Impact**: when `fighterPoints[winners[i]]` is deducted from totalPoints when totalPoints is zero at the first round, could cause unnexpected behaviors, errors and false information.
https://docs.soliditylang.org/en/latest/security-considerations.html#two-s-complement-underflows-overflows

**Proof Of Code**:

```javascript
    function pickWinner(uint256[] calldata winners) external {
        require(isAdmin[msg.sender]);
        require(winners.length == winnersPerPeriod, "Incorrect number of winners");
        require(!isSelectionComplete[roundId], "Winners are already selected");
        uint256 winnersLength = winners.length;
        address[] memory currentWinnerAddresses = new address[](winnersLength);
        for (uint256 i = 0; i < winnersLength; i++) {
            currentWinnerAddresses[i] = _fighterFarmInstance.ownerOf(winners[i]);
            //here
            totalPoints -= fighterPoints[winners[i]];
            fighterPoints[winners[i]] = 0;
        }
        winnerAddresses[roundId] = currentWinnerAddresses;
        isSelectionComplete[roundId] = true;
        roundId += 1;
    }
```

```javascript
    /// @notice Total points.
    uint256 public totalPoints = 0;
```

**Recommended Mitigation:**

1. There should be a check to check if totalPoints is zero or greater than `fighterPoints[winners[i]]` before deducting the points.

**Occurences**: 1 time

1. Line 315, GameItems.sol

**Impact**: could cause unnexpected behaviors and false information.

```javascript
    function _replenishDailyAllowance(uint256 tokenId) private {
        allowanceRemaining[msg.sender][tokenId] = allGameItemAttributes[tokenId].dailyAllowance;

        // here
        dailyAllowanceReplenishTime[msg.sender][tokenId] = uint32(block.timestamp + 1 days);
    }
```

```javascript
    /// @notice Mapping of address to tokenId to get replenish timestamp.
    mapping(address => mapping(uint256 => uint256)) public dailyAllowanceReplenishTime;
```

**Recommended Mitigation:**

1. Change the mapping at `GameItems::line 77` `dailyAllowanceReplenishTime` to `mapping(address => mapping(uint256 => uint32))`

## [M-3] `MergingPool::getFighterPoints` returns an array of only 1 element which is the `fighterPoints` of the max Id instead of an array of points corresponding to different fighters' token IDs because `uint256[] memory points` can only contain one element.

**Impact**:
This function doesnt properly do what it intends to do, it returns the points of the maxId instead of an array of fighterIds and their points because it has been initialized to contain only one element.

Fixed size memory arrays cannot be assigned to dynamically-sized memory arrays, i.e. the following is not possible:
https://docs.soliditylang.org/en/develop/types.html#allocating-memory-arrays

**Proof Of Code**:

```javascript

    function getFighterPoints(uint256 maxId) public view returns(uint256[] memory) {

        uint256[] memory points = new uint256[](1);
        for (uint256 i = 0; i < maxId; i++) {
            points[i] = fighterPoints[i];
        }
        return points;
    }
```

**Recommended Mitigation:**

1. **Remove** the initialization so the array can take up as much elements as needed.

```diff
    function getFighterPoints(uint256 maxId) public view returns(uint256[] memory) {

-        uint256[] memory points = new uint256[](1);
+        uint[] points;
        for (uint256 i = 0; i < maxId; i++) {
            points[i] = fighterPoints[i];
        }
        return points;
    }
```

## [M-4] `numToMint` parameter in `FighterFarm::claimFighters` function could be used to potentially mint alot of tokens and can cause DOS attack

**Impact**: Can cause possible DOS on the chain and cost higher gas to mint or create new fighters if numToMint was for example
numToMint[0] = 50;
numToMint[1] = 50;
this could cause a DOS and high gas as the loop will attempt to mint 100 fighters.
https://docs.soliditylang.org/en/latest/security-considerations.html#gas-limit-and-loops

```javascript
 function claimFighters(
        uint8[2] calldata numToMint,
        bytes calldata signature,
        string[] calldata modelHashes,
        string[] calldata modelTypes
    )
        external
    {
        bytes32 msgHash = bytes32(keccak256(abi.encode(
            msg.sender,
            numToMint[0],
            numToMint[1],
            nftsClaimed[msg.sender][0],
            nftsClaimed[msg.sender][1]
        )));
        require(Verification.verify(msgHash, signature, _delegatedAddress));
        uint16 totalToMint = uint16(numToMint[0] + numToMint[1]);
        require(modelHashes.length == totalToMint && modelTypes.length == totalToMint);
        nftsClaimed[msg.sender][0] += numToMint[0];
        nftsClaimed[msg.sender][1] += numToMint[1];
        //@audit this loop will run as long as the addition of total mint and can cause DOS
        for (uint16 i = 0; i < totalToMint; i++) {
            _createNewFighter(
                msg.sender,
                uint256(keccak256(abi.encode(msg.sender, fighters.length))),
                modelHashes[i],
                modelTypes[i],
                i < numToMint[0] ? 0 : 1,
                0,
                [uint256(100), uint256(100)]
            );
        }
    }
```

**Recommended Mitigation:**

1. On the delegated server, a check should be put to limit the amount of mints mintable at a particular time.

## [L-1] `RankedBattle::_addResultPoints` function does not update the `globalStakedAmount` after an ammount has been staked

**Occurences**: 2 times

1. `RankedBattle::_addResultPoints` function at line 465, RankedBattle.sol.
2. `RankedBattle::_addResultPoints` function at line 500, RankedBattle.sol.

**Impact**:
This could cause wrong information to users or stakeholders if the `globalStakedAmount` doesnt update as it should

**Proof Of Code & Added Mitigation**:

```diff
            /// If the user has stake-at-risk for their fighter, reclaim a portion
            /// Reclaiming stake-at-risk puts the NRN back into their staking pool
            if (curStakeAtRisk > 0) {
                _stakeAtRiskInstance.reclaimNRN(curStakeAtRisk, tokenId, fighterOwner);
                amountStaked[tokenId] += curStakeAtRisk;
                // Added code below as solution
+                 globalStakedAmount += curStakeAtRisk;
            }
```

```diff
{
                /// If the fighter does not have any points for this round, NRNs become at risk of being lost
                bool success = _neuronInstance.transfer(_stakeAtRiskAddress, curStakeAtRisk);
                if (success) {
                    _stakeAtRiskInstance.updateAtRiskRecords(curStakeAtRisk, tokenId, fighterOwner);
                    amountStaked[tokenId] -= curStakeAtRisk;
                     // Added code below as solution
+                    globalStakedAmount -= curStakeAtRisk;
                }
            }
```

globalStakedAmount should be updated to keep proper records of the storage values

## [L-2] `RankedBattle::_addResultPoints` function does not emit events `Staked` or `Unstaked` when `amountStaked[tokenId]` is increased or reduced.

**Occurences**: 2 times

1. `RankedBattle::_addResultPoints`, line 465 RankedBattle.sol
2. `RankedBattle::_addResultPoints`, line 500 RankedBattle.sol

**Impact**: Doesnt follow proper practices and doesnt help readability of code and loss of information

```diff
            if (curStakeAtRisk > 0) {
                _stakeAtRiskInstance.reclaimNRN(curStakeAtRisk, tokenId, fighterOwner);
                amountStaked[tokenId] += curStakeAtRisk;

+               emit Staked(msg.sender, amount)
            }
```

```diff
else {
                /// If the fighter does not have any points for this round, NRNs become at risk of being lost
                bool success = _neuronInstance.transfer(_stakeAtRiskAddress, curStakeAtRisk);
                if (success) {
                    _stakeAtRiskInstance.updateAtRiskRecords(curStakeAtRisk, tokenId, fighterOwner);
                    amountStaked[tokenId] -= curStakeAtRisk;
+                    emit unStaked(msg.sender, amount)
                }
            }
```

**Recommended Mitigation:**

1. A check such as `require(fighterType == 1 || fighterType == 0, "fighterType should be 1 or 0")` can be put to make sure admin gets to put the right input.

## [L-3] `Neuron::setupAirdrop`can cause a potential DOS and high gas fees if the recipients array has no guard check.

**Impact**:
If an admin isnt informed properly and makes an airdrop to create allowances from the treasury, if the admin inputs alot of recipients i.e 7000 recipients, this can make the function loop very long and cause alot of fees on the chain when it gets to 4000th recipients etc.
https://docs.soliditylang.org/en/latest/security-considerations.html#gas-limit-and-loops

```javascript
    function setupAirdrop(address[] calldata recipients, uint256[] calldata amounts) external {
        require(isAdmin[msg.sender]);
        require(recipients.length == amounts.length);
        uint256 recipientsLength = recipients.length;
        for (uint32 i = 0; i < recipientsLength; i++) {
            _approve(treasuryAddress, recipients[i], amounts[i]);
        }
    }
```

**Recommended Mitigation:**

1. There should be a limit on the amount of airdrops/recipients an admin can send out at once to put a guard check on the loop.

## [L-4] Casting a `uint32` value to a uint256 storage at `GameItems::_replenishDailyAllowance` contract is not best practise.

## [G-1] `attributes.length` at `AiArenaHelper::addAttributeProbabilities` should be declared as a constant = 6 or reduces to an uint8 in the loops to save gas.

**Occurences**: 3 times

1. `AiArenaHelper::addAttributeProbabilities`, line 138 AiArenaHelper.sol
2. `AiArenaHelper::addAttributeDivisor`, line 72 AiArenaHelper.sol
3. `AiArenaHelper::createPhysicalAttributes`, line 98 AiArenaHelper.sol

**Impact**: Takes more gas

```javascript
   uint256 attributesLength = attributes.length;
        for (uint8 i = 0; i < attributesLength; i++) {
            attributeProbabilities[0][attributes[i]] = probabilities[i];
            attributeToDnaDivisor[attributes[i]] = defaultAttributeDivisor[i];
        }
```

**Recommended Mitigation:**

1. attributes.length should be saved as a constant at the beginning of the contract to save gas
2. if you decide not to make attributes.length a constant, it should be initialized as a uint8 since we know the value is very small in the function instead of uint256

## [G-2] Right shift or Left shift instead of dividing or multiplying by powers of two

**Occurences**: 1 time

1.  Neuron.sol:37

**Impact**: Uses more gas

```javascript
    /// @notice Initial supply of NRN tokens to be minted to the treasury.
    uint256 public constant INITIAL_TREASURY_MINT
    10**18 * 10**8 * 2;
```

**Recommended Mitigation:**

1. you can re-write the constant as

```solidity
uint256 public constant INITIAL_TREASURY_MINT
   10**18 * 10**8 << 1 ;
```

## [I-1] Probabilities can be initialized at contract `AiArenaHelper::addAttributeProbabilities` as a 6 length array

**Impact**: None, better practise

```javascript
  function addAttributeProbabilities(uint256 generation, uint8[][] memory probabilities) public {
        require(msg.sender == _ownerAddress);
        require(probabilities.length == 6, "Invalid number of attribute arrays");

        uint256 attributesLength = attributes.length;
        for (uint8 i = 0; i < attributesLength; i++) {
            attributeProbabilities[generation][attributes[i]] = probabilities[i];
        }
    }
```

**Recommended Mitigation:**

1. `uint8[][] memory probablities` array can be initialized as `uint8[6][]` for easy reading and best practices

## [I-2] Line 209 & 210 in FighterFarm::claimFighters does not follow CEI, which is not best practise, both lines should be moved to the bottom of the function after fighter is created

**Impact**: None, not good practise

```diff
    function claimFighters(
        uint8[2] calldata numToMint,
        bytes calldata signature,
        string[] calldata modelHashes,
        string[] calldata modelTypes
    )
        external
    {
        bytes32 msgHash = bytes32(keccak256(abi.encode(
            msg.sender,
            numToMint[0],
            numToMint[1],
            nftsClaimed[msg.sender][0],
            nftsClaimed[msg.sender][1]
        )));
        require(Verification.verify(msgHash, signature, _delegatedAddress));
        uint16 totalToMint = uint16(numToMint[0] + numToMint[1]);
        require(modelHashes.length == totalToMint && modelTypes.length == totalToMint);
-        nftsClaimed[msg.sender][0] += numToMint[0];
-        nftsClaimed[msg.sender][1] += numToMint[1];
        for (uint16 i = 0; i < totalToMint; i++) {
            _createNewFighter(
                msg.sender,
                uint256(keccak256(abi.encode(msg.sender, fighters.length))),
                modelHashes[i],
                modelTypes[i],
                i < numToMint[0] ? 0 : 1,
                0,
                [uint256(100), uint256(100)]
            );
        }
+        nftsClaimed[msg.sender][0] += numToMint[0];
+        nftsClaimed[msg.sender][1] += numToMint[1];
    }
```

## [I-3] Wrong comment on code

**Occurences**: 1 time

1. Line 51, MergingPool.sol -> `fighterPoints` mapping;

**Impact**: false code information.

```javascript
    /// @notice Mapping of address to fighter points.
    mapping(uint256 => uint256) public fighterPoints;
```

**Recommended Mitigation:**

1. comment should be change from `address to fighter points` to `tokenId to fighter points`

## [I-4] `FighterFarm::incrementGeneration` function should check fighterType to be either zero or 1

**Occurences**: 1 time

1. `FighterFarm::incrementGeneration`, line 129 FighterFarm.sol

**Impact**: Doesnt follow proper practices and doesnt help readability of code

```javascript
    function incrementGeneration(uint8 fighterType) external returns (uint8) {
        require(msg.sender == _ownerAddress);
        generation[fighterType] += 1;
        maxRerollsAllowed[fighterType] += 1;
        return generation[fighterType];
    }
```

**Recommended Mitigation:**

1. A check such as `require(fighterType == 1 || fighterType == 0, "fighterType should be 1 or 0")` can be put to make sure admin gets to put the right input.

## Quality Analysis

1. consider using modifiers to properly structure code, to improve readability and simplicity
