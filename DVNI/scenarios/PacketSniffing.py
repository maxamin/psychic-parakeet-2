"""
Packet Sniffing
===============
"""

import random

from mininet.node import OVSSwitch

from utils import subnet
from container.kali import Kali
from container.vsftpd import Vsftpd
from scenarios import Scenario
from utils.account import add_user, generate_password


class Import(Scenario):
    """This scenario requires the user to use wireshark/tcpdump to capture FTP credentials being sent on the network."""

    name = "Packet Sniffing"
    enabled = True
    weight = 30
    connection_wait = 5  # Number of seconds between ftp connections

    ftpd = None
    ftp_clients = []
    kali = None
    switch = None

    user = "user"
    pw = None

    packages = ["wireshark", "tcpdump", "ftp"]

    def create_network(self, controller=None):
        """Adds a switch, Kali, vsftpd, and some hosts to the network."""

        Scenario.create_network(self, controller)
        self.add_switch()
        # Create a random subnet to add hosts to
        prefixlen = random.randint(27, 29)
        hosts = list(subnet.generate(prefixlen).hosts())
        # Add kali
        self.kali = self.net.addDocker('kali',
                                       cls=Kali,
                                       ip="%s/%s" % (hosts.pop(), prefixlen))
        self.kali.install_package(*self.packages)
        self.net.addLink(self.switch, self.kali)
        # Add ftpd
        self.ftpd = self.net.addDocker('ftp',
                                       cls=Vsftpd,
                                       ip="%s/%s" % (hosts.pop(), prefixlen))
        self.net.addLink(self.switch, self.ftpd)
        # Add ftp client
        for i in range(random.randrange(1, 5)):
            ftpc = self.net.addHost('ftpc'+str(i),
                                    ip="%s/%s" % (hosts.pop(), prefixlen))
            self.net.addLink(self.switch, ftpc)
            self.ftp_clients.append(ftpc)

    def add_switch(self):
        self.switch = self.net.addSwitch('s1', cls=OVSSwitch, failMode='standalone')

    def add_ftp(self):
        """Adds credentials to the FTP server and sets the clients to make authentication temps to the server. One client is given the correct credentials."""
        # 20 hex digit password
        self.pw = [generate_password() for _ in self.ftp_clients]
        add_user(self.ftpd, self.user, self.pw[0])
        for i in range(len(self.ftp_clients)):
            self.ftp_clients[i].sendCmd("\n".join([
                "watch -n %s 'ftp -n %s << EOF" % (self.connection_wait, self.ftpd.IP()),
                "quote USER %s" % self.user,
                "quote PASS %s" % self.pw[i],
                "quit",
                "EOF' &"
            ]))

    def run_network(self):
        """Runs the network. Adds an OpenFlow rule the the network switch for flood packets on all ports."""
        Scenario.run_network(self)
        self.add_ftp()
        # Add a rule to the switch to flood packets
        self.switch.dpctl("add-flow", "action=flood")

    def generate_task(self, doc):
        super(Import, self).generate_task(doc)
        doc.add_paragraph('In this scenario your kali machine is connected to a hub, this means that all traffic is sent to every connected device.')
        doc.add_paragraph('This task requires you to use Wireshark/tcpdump to sniff packets on the network.')
        doc.add_paragraph('NOTE: It may be useful to filter by protocol and ip when dumping packets.').bold = True
        doc.add_paragraph('Answer the following questions:')

    def generate_questions(self):
        self.questions += [("What host IPs are sending traffic on the network", '\n'+'\n'.join(ftpc.IP() for ftpc in self.ftp_clients + [self.ftpd])),
                           ("What protocol(s) are being used", "File Transfer Protocol (ftp)"),
                           ("What port is being used", "21"),
                           ("What credentials are being used", ''.join(["\n%s:%s" % (self.user, pw) for pw in self.pw])),
                           ("Are the credentials valid", "Yes, %s:%s" % (self.user, self.pw[0]))]


if __name__ == "__main__":
    # Run network
    Import(developer=True, seed="debug").run()
