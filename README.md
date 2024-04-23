# leaflet-challenge
## Create the Earthquake Visualization
### Resources: I used a data set from the United States Geological Survey linked here https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php.
The url for the specific data set I used is in the logic code.
I used openstreetmap for the street map layer of my map linked here https://www.openstreetmap.org/copyright, and open topography linked here https://opentopography.org/usageterms#:~:text=Data%20and%20Content,non%2Dcommercial%20and%20commercial%20uses. for the topographical layer.

My classmate Greg helped me with some troubleshooting in code and with my markerSize code specifically; although, he multiplied his magnitude by 100000, which looked too big in my opinion, so I did mine by 50000.

### Importing the data.
I imported my data using D3 by setting the url for my data set as a variable, using console.log and createFeatures as functions to aid in later code.

I then worked on function for markerSize to set the size of the markers by magnitude by multiplying the magnitude by 50,000.

After that I set the depth color variables.
#### Note: I did the opposite of the instructions because they said to make it a lighter color the closer to the surface the earthquake occurred; however, earthquakes closer to the surface are typically more dangerous than ones that happen deeper because they have to travel through less rock to get there. Since we normally associate darker (red) colors with danger rather than lighter (blue, green, yellow), I opted to reverse the process. Hopefully that makes sense and points won't be deducted, but if I need to fix it for my grade, I will.

I included popups to show the location and date of each earthquake, but I could not get the legend to work. I'm going to go ahead and turn this in and keep working on the legend to see if I can get it to work or not.
