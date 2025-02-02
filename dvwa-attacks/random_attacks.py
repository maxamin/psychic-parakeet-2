import subprocess
import random
from datetime import datetime
import time


def RandomAttacks():
    attack_no_implemented = [0, 1, 4, 5, 10, 11, 12]
    attacks_list_len = len(attack_no_implemented)
    attacks_nb_to_exec = random.randint(1, attacks_list_len - 1)
    attacks = attack_no_implemented[attacks_nb_to_exec]

    #attacks.append(attack_no_implemented[attacks_nb_to_exec])

    #for i in range(0, attacks_nb_to_exec):
    #    no = random.choice(attack_no_implemented)
    #    attacks.append(no)
    #    attack_no_implemented.remove(no)

    #f = open("attacks_log.txt", "a+")
    #f.write("Starting {} type of attacks at {} \n".format(attacks_nb_to_exec, datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
    #f.close()

    #for no in attacks:
    cmd = "python3 attacks_manager.py {}".format(attacks)
    subprocess.run(cmd, shell=True)
    
    print("All attacks have been completed.")
   
    
    
def JobScheduler(f, n):
    while(True):
        f()
        time.sleep(n)


def main():
    JobScheduler(RandomAttacks, 5*60)

if __name__ == '__main__':
    main()
