# Elect-3.0

##### Any feedback will be appriciated.

</hr>

The Elect 3.0 is developed to overcome the flaws of EVM system. So directly EVM will be replaced by touch screen interface having the great user interface and high security. The project is based on an emerging tech of web3 - The Blockchain.

Blockchain-based voting systems are a new and innovative way to vote. They use blockchain technology to store and verify votes, which makes them more secure and transparent than traditional voting systems.

In a blockchain-based voting system, each vote is stored as a transaction on the blockchain. This means that the vote is tamper-proof and cannot be changed or deleted. The blockchain also makes it possible to track the votes in real time, which gives voters confidence that their votes are being counted accurately.

Another advantage of blockchain-based voting systems is that they are more accessible than traditional voting systems. Voters can cast their votes from anywhere in the world, as long as they have an internet connection. This makes it easier for people to vote, especially those who live in rural areas or who have difficulty getting to the polls.

<details>
<summary>Screenshots</summary>
<br>

- ![All in one](https://github.com/pushan-alagiya/Elect-3.0/blob/master/ui/Screenshots/7.png)
- ![All in one](https://github.com/pushan-alagiya/Elect-3.0/blob/master/ui/Screenshots/6.png)

</details>

<details>
<summary>Advantages of Blockchain based Voting System</summary>
<br>
- Security: Blockchain technology is very secure and makes it very difficult to tamper with votes.

- Transparency: Blockchain technology makes it possible to track the votes in real time, which gives voters confidence that their votes are being counted accurately.

- Accessibility: Blockchain-based voting systems are more accessible than traditional voting systems, as voters can cast their votes from anywhere in the world.
</details>

### Installing and Running Project

Install Dependencies

```
npm install
```

Running Project

```
node index.js
```

If dependency problem occurs delete package.json, Run

```
npm init
```

Again Install dependencies and run project.

### Running Project

Step 1 - Setting up Environment
Instead of developing the app against the live Ethereum blockchain, we have used an in-memory blockchain (think of it as a blockchain simulator) called testrpc.

```
npm install ethereumjs-testrpc web3
```

Step 2 - Creating Voting Smart Contract

```
npm install solc
```

### Detailed Working of the project

- The authority must login first with the provided session ID.
- The voter can now begin the process of voting with proper authentication through OTP(one time password) on the respective linked mobile number.
- If the voter is valid then the system will check for for the voters age and the address to which he can give vote.
- the voting pallete will be opned with candidate names,their parties and logos.
- Now the voter can give his vote by clicking vote button.
- one voter can give his vote only once,i.e after one time voting buttons are disabled and the vote is automatically loged out.
- Same process continiues for many more votters irrespective of their voting wards.
