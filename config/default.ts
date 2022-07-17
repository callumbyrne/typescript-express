import "dotenv/config";

export default {
    port: 1337,
    dbUri: process.env.MONGODB_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1yr",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCq8UkKcVQf/v8Hdye3kNb9MUNp
iq0MoA8dvVoLl389unTLQa4hpdFKyrRhfsD1iloWk1jLpVOO1mxNeQlaDP6Se3bx
P4l1tPZtGq3LI9itW7J9BmqfdVAkgUkmZnylxLfkIQyiuMIJES0A8fhosY64Jl4s
oP8mzZ8QjaKzxSBanQIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCq8UkKcVQf/v8Hdye3kNb9MUNpiq0MoA8dvVoLl389unTLQa4h
pdFKyrRhfsD1iloWk1jLpVOO1mxNeQlaDP6Se3bxP4l1tPZtGq3LI9itW7J9Bmqf
dVAkgUkmZnylxLfkIQyiuMIJES0A8fhosY64Jl4soP8mzZ8QjaKzxSBanQIDAQAB
AoGAMc22sBownlnWx8AJjEvgt0fhEiDbJjCD9vAyCeqLodpvKMDsENWU0quYPkeF
xIQYlzc6yapTW+xRBYlcFiZvDJiP7/IMuWdjbidNEwufLqmK8L/nTJCyJ4wXCfHV
Y3FuxYvCr9O8NtvOHOd1oufscBoFgO2C2gY4IOTL+eeD06kCQQDT7RTKNaxGrSxA
Levj10ey08By+YqSA9U2MYEUAyR13XbiettrdVtxP+92KjSxf+NnQ1fO+WRqXabO
qRG3fOvPAkEAzn4+W+XhdIyyzmO9IeO1nIOJMAn5BwhN7CkTK5os1KfeLkowVFnq
rnkxQ8hFrVEJRTXf6HgoNzJoolooFHrR0wJAMWrNOEG/xFNJSEXtBZoDnA2IiMbr
qxS9uP9eK/53mAxmVnVziOE6y3OvMQyycNlze3bWmOrKoYrpBLOj7/dvPQJAfNJT
X7nWT129uIUSDypW3gWlKCTfJCEg+WDa9cB82Q+gftrZ3CN+eXlJDnBBrkMOF4g5
kY0Qwkz2cy2MjNSxgQJAIGEIyuD0lnYioWOo9c5KVQx4iocX0ceP1pPesY6NvLJR
1TNcJswSohhyP33WwEp42UkZAIRXt0Gsv8Dq9s6jvw==
-----END RSA PRIVATE KEY-----`,
};
