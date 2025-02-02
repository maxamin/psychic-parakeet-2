# Platform - https://ethertix.co.uk

# Project Proposal

Nowadays, blockchain based web applications are becoming more and more popular. Decentralised applications that are being built on the Ethereum blockchain have more advantages than centralised ones. Users do not have to rely on a centralised and governed authority such as banks or any other intermediaries to verify and approve transactions. Usually because transactions are placed in a pending state which can take a very long time to be approved by banks. Transactions could also potentially fail if they are deemed to be suspicious of malicious activity. However, the main problem is that online transactions are prone to be intercepted by malicious users which can result in fraud. They also come with security flaws when stored in a local database. Thus, we propose to take a hybrid approach to building a blockchain oriented web application with the scope of eradicating the risk of event tickets from being stolen and tampered with. At the same time maintaining a strong level of data provenance. Users can view, search, paginate and sort through popular events in their local area and purchase tickets corresponding to an event. An important objective that this start-up aims to achieve is to prevent authentic event tickets from being counterfeited, stolen, and copied by implementing a tamper-proof blockchain solution that gives users proof of ownership that they own a specific ticket without the involvement of a governed authority to approve transactions. 

Purchasing tickets can be achieved through the implementation of a smart contract. Also, tickets can be bought by directly sending ether currency to the organiser’s web wallet instantaneously. Without involving a middleman to verify and provide the physical ticket(s) upon event entry or by e-mail address. An advantage to this is enhanced data provenance. Thus, every transaction is time stamped and logged inside the blockchain which can be tracked at any point, preventing fraudulent activity and counterfeited tickets. Furthermore, once the organiser receives the payment for the ticket(s) in their wallet, then, a phone call or a message can be sent by the organiser to let the attendee(s) know that the purchase was successful. Users can also view their recently purchased tickets and upcoming events on their profile page. 

# Project Scope
The main reason for going ahead with the proposed development of this application is preventing cheap, very important or expensive tickets from being counterfeited, lost (physically or by e-mail), modified (torn and/or tampered with) stolen by fraud, and/or resold on malicious websites before attending an event as well as proof of ownership. In the context of this application, events can be hosted by organisers at a venue. Meaning, that event data must be initially configured through a secure and protected admin dashboard with strong authentication. Without interference from unauthorized users. Event, Ticket and Venue data can also be modified and deleted according to the organiser. Conventionally, users would pay for tickets using their debit card / credit card, through a PayPal gateway, or other payment provider. However, this application will instead allow users to purchase tickets by paying the event organiser in ether currency. Which most event hosting applications don’t have. And is considered as a gap in the market. Payments can be made by depositing ether to the organisers meta mask wallet address through an API. Thus, storing every order transaction on the blockchain instead of a local database for the payment data. Thus, making every transaction fast, secure, and efficient in terms of cost and CPU / RAM computational resources. Every transaction is cryptographically hashed, making it impossible for the data to be intercepted and hacked. Ultimately making the application extremely secure and fast.

Once a ticket is purchased, the user completely owns this ticket associated to an event because the transaction for the ticket gets stored inside a cryptographic hash in the form of 0x and inserted inside the blockchain ledger. Thus, uniquely identifying the user who purchased it; hence, the ticket cannot be replicated. Therefore, the data cannot be lost since there is a chain of records stored on the blockchain that proves that the transaction has been made through smart contract execution. Hence, making the application very secure and fast. Also, preventing fake tickets from being forged and resold on malicious websites. Thereby, eliminating the risk of the application being hacked by malicious users due to the immutability of the blockchain. Meaning that no transactions can be altered or deleted. The problem that this application is aiming to solve is eliminating time spent waiting on central banks to approve transactions when making a purchase. Instead, giving users full proof of ownership of event tickets as quickly as possible to improve the speed and reliability of the application.

# Target Audience

The initial target audience that this application aims to capture are teenagers between the ages of 13-19, adults (20-40) and elders living in the United Kingdom who are actively looking for events to attend in their local area. Without relying on centralised banks to verify and approve the transactions they make when purchasing the tickets. Moreover, as the project progresses overtime there will be more countries added as to where events can be hosted. In addition to the above, an advantage of developing this application on the Ethereum blockchain is mainly proof of ownership of a digital asset. Ledger immutability, enhanced security, improved efficiency, and data integrity. 

# Business Case - Executive Summary

EtherTix is a new start-up that focuses on expanding its events that users can attend with their family or friends. This is achieved through various promotion techniques on the web application. Such as providing users information about how it works and how we differ from other event hosting platforms such as Eventbrite or Ticket Master. Moreover, the web application is going to primarily allow the start-up to showcase its most popular events at specific venues where users can buy tickets by sending ETH currency to the organiser’s wallet.

Our approach is to build a hybrid centralised and decentralised web application whereby we do not offer a traditional payment gateway to purchase tickets. Mainly, due to security vulnerabilities that can potentially give way. Moreover, transactions generally take a very long time to be approved and could also fail if malicious activity is found. The main scope of this project is to build a hybrid blockchain web application which prevents event tickets from being lost, tampered, torn, and resold on malicious websites which is classed as fraudulent activity. This is achieved by removing traditional payment gateways such as PayPal and credit / debit card. Instead, we aim to build the application on the Ethereum blockchain where event organisers are paid directly in ether currency and allows transactions to be executed instantaneously without any delays and without the involvement of banks. Ultimately allowing the transactions to be processed in a shorter amount of time.

The ROI is expected to be gathered from the number of tickets that have been purchased by event attendees. Users do not have to rely on a centralised governed authority to approve the transactions. Thus, the event organiser can directly keep in touch with the buyer by giving them an SMS with the e-ticket in the form of a QR code which can be scanned upon entry, uniquely identifying the event ticket stored in the database. Preventing physical tickets to be in the user’s possession. As a prerequisite, users are expected to have a Meta Mask wallet account using chrome’s browser extension before making any purchases which is responsible for interacting directly with their account that holds ether currency. 


# Business Case - Development Reasons

Other event organising platforms out there such as Event Brite or Ticket Master which are centralised applications do not support ether payments. Not only does this make their application less secure because their database could get hacked at any unforeseen point in time, but banks are generally involved in verifying the authenticity of transactions which can fail at any point and therefore is not very reliable. Our mission is to expand and promote our collection of events being hosted throughout the United Kingdom. Also, the crucial reason for developing this application is to prevent physical event tickets from being lost once in the possession of the buyer. This can be bypassed by implementing a proof of ownership solution which clearly shows who the owner of an event ticket is by storing the unique transaction on the blockchain instead of a central database.

Secondly, another reason for developing this application is to bypass transaction delays / failures by transferring ether to the event organiser through a Meta Mask web wallet without the involvement of banks. Thus, once the organiser receives payment for the event ticket(s), the funds can be withdrawn from the organiser’s account directly to their bank account using a cryptocurrency exchange platform or through Pay Pal.

Finally, it is quite common for event tickets to be in possession of the wrong people. We are aiming to prevent authentic and expensive tickets from participating in fraudulent activity. Bought tickets can then be resold on malicious websites for a higher or lower price which is not feasible. Therefore, all the transactions for purchasing one or more tickets are stored as a 20-byte hash on the blockchain which cannot be tampered with, therefore showing proof of ownership of the tickets by allowing a single individual to view how many tickets they’ve purchased on their profile and past events they have attended to bypass this issue of fake and fraudulent tickets being resold.

# NFT Smart Contract - Solution Approach

Developing non-fungible tokens using the Solidity programming language requires several variables to be declared and configured ahead of time. As well as a data structure to represent the contents of a token. Firstly, a struct can be initialised called NftToken which stores certain data variables regarding a token. Such as its ID which is going to be incremented every time a new token is minted and the token at the same time gets placed into circulation. Also, for every new token that gets minted, they are simultaneously inserted into an array of minted non-fungible tokens. Moreover, the current owner of the token is represented by an address data type which is a 20-byte hexadecimal address stored on the blockchain, determining the wallet address of the person who holds the token. We then proceed to declare a variable that is responsible for storing the total supply of the tokens that have been minted. A 256-byte integer data type is used to store the total supply. Furthermore, Solidity supports key value pair mappings, which maps one type of data to another. Hence, a mapping can be created between an integer and the initial struct which stores the number of circulating tokens that are available. This number would then be incremented after a token is minted. Every token that is live on the blockchain must have an initial default listing price associated, as well as a boolean flag which identifies if it is currently on sale or not.

Firstly, the process of minting a token starts with declaring a function which accepts two parameters which are passed by value and stored in memory. We need to know the token name, its price, the current index in the array it is positioned at and the token class, such as premium, basic, or standard. Moreover, by storing the current owner of the token to a value known as msg.sender. This is a value provided by solidity which stores the address of the current issuer of the token. Once a token has been minted, another piece of functionality that is crucial for non-fungible tokens is to list it for sale after it has been minted. One approach taken to implement the list for sale function is to firstly extract the token we want to list on sale from the current circulating supply of tokens and thereafter by referencing the NFT struct to update the token price with the listing price which is going to represent the price of the current token.

<img width = "550" alt="image" src="https://user-images.githubusercontent.com/29733613/221880443-3cd6e357-0ca9-4fd4-87ba-0c10baeb4b5b.png">



# Authentication Service - Use Case Diagram

First and foremost, one important design methodology that is used to design this system are UML Use Case diagrams. Generally, these diagrams show how the users are going to interact with the system. Figure 1.0 below shows the authentication use case diagram for the system. An advantage of use case diagrams is that it captures all the functional requirements that are required to be implemented in the system. Thus, the client has a clear picture of how user interaction is going to happen. Adding continuous value to the project over time since the diagrams do not contain any requirements that are not required in the project. Thereby, preventing waste which does not add any value to the project

![auth](https://user-images.githubusercontent.com/29733613/193555626-b9e2bb88-b4d2-4916-b355-b0153c3d0c22.png)


# Events Service - Use Case Diagram

<img width="520" alt="image" src="https://user-images.githubusercontent.com/29733613/193553271-85415991-39b2-442a-927a-f537e975ddff.png">

# Functional Requirements

1.	Authentication Service: Users must be able to Register their own account on the platform.

2.	Authentication Service: Users must be able to Verify their e-mail address to add extra security to their account.

3.	Authentication Service: Users must be able to Login into their account after e-mail verification on the frontend.

4.	Authentication: Users must be able to submit a two-factor code before logging in. The code must be randomly generated from the server-side.

5.	Authentication: Users must be able to send a Forgot Password link to their e-mail address.

6.	Authentication: Users must be able to Reset their password by clicking the reset password link from the e-mail sent.

7.	Authentication Service: Users must be able to view their currently logged in details on their profile page.

8.	Authentication Service: Users must be able to Logout of their account.

9.	Authentication Service: Users must be able to update their password on their personal profile.

10.	 Authentication Service: Users must be able to update their e-mail address and/or username on their personal profile.

11.	 Authentication Service: Event Organisers must be able to lock a user’s account if malicious activity is detected.

12.	 Authentication Service: Every user must have a role associated to their account. For example, event-organiser, moderator, admin to prevent certain actions from being taken.

13.	 Events Service: Event Organisers must be able to create a new event within the dashboard.

14.	 Events Service: Event Organisers must be able to edit the details of an event on the admin dashboard.

15.	 Events Service: Regular users must be able to view all the available events that are being hosted at a venue in their area.

16. Categories Service: Regular users must be able to choose the type of event category they would like to view events in. For example, events for health and fitness or food and drink.

17.	 Events Service: Users must be able to view the details of a single event.

18.	 Tickets Service: Users must be able to select the ticket type and number of tickets.

19.	 Users must be able to connect their meta mask wallet for blockchain payments.

20.	 Organisers must be able to delete an event that will no longer be hosted from the protected dashboard

21.	 Users must be able to sort events in either ascending or descending order.

22.	 The application must have a navigation bar at the top of the page that has a search input field in the middle of the bar.

23.	The application must have a navigation bar at the top of the page with register and login links on the right-hand side.

24.	 Categories Service: Users must be able to choose which category of events they would like to browse.

25.	 Events must have a variety of categories to choose from, Health, Food & Drink, Sports & Fitness, for example.

26.	 Authentication Service: Regular Users should be able to login using their Google and Facebook accounts.

27.	 Events Service: Regular users should be able to sort through events in ascending / descending order.

28.	 Regular users must go on different pages to view available events through Pagination.

29.	 Regular users must be able to view the currently trending events which are most popular.

30.	 Regular users must be able to click on an event and view information about it by showing a popup modal.

- Use Ca

