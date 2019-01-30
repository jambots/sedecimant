# sedecimant
Description 
Sedeciment is a flat message format featuring required metadata fields combined with a payload conforming to a typed structure of data, code, and encoded media limited to under 16MB in total document size. No external dependancies are required for a single record to be understood. A list of allowed types and a plugin expressing their compatable handlers comprises the contents of this project. Additionally a peer to peer syndication REST API is included to support the example Wordpress plugin.

Installation
This code is for demonstration purposes, and is not yet refined for deployment.

Configuring
The REST API is buit to run on MEAN stack, in this case Bitnami on Lightsail.
Adjust the plugin $endpoint to your REST API ip address or URL. The Node project was originally adapted from https://github.com/mikegcoleman/todo

How to Contribute
Email tschubring@jambots.com if you have a use case for this type of message format.