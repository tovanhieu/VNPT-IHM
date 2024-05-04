 

###### PYTHON - START #######

 

import paramiko
import sys
import logging

 

# Define the SSH parameters

ip_address = '10.36.90.7'

username = 'admin'

password = 'Ttcntt@2016'

 

# Create an SSH client

client = paramiko.SSHClient()

client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

 

# Connect to the switch
# logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)

client.connect(ip_address, username=username, password=password)

 

# Send a command to the switch and print the output

command = "show version"

stdin, stdout, stderr = client.exec_command(command)

output = stdout.read().decode()

print(output)

 

# Close the SSH connection

client.close()

 

###### PYTHON - END #######