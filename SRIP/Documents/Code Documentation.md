# Experiment	Code	Documentation

# Introduction

This	document	captures	the	experiment	implementaon	details.

# Code	Details

File	Name	:	sketch_voiced.js and sketch_unvoiced.js

File Description : These files plot the time amplitude spectrum and extracts the residual signal from voiced and unvoiced sound features respectively. 

Functions	:	rawplot()
                rawplot1()
                residueplot()
                residueplot2()


Function	Description	: rawplot()
This function plots the time-amplitude spectrum of the voiced and unvoiced sound samples respectively. The spectrum object is created from p5.FFT class. The waveform() function returns an array of amplitude values (between -1.0 and +1.0) that represent a snapshot of amplitude readings. This amplitude is plotted against time using map function. 

Function Description: drawresidueplot()
This function extracts the residue values from the amplitude array. The residue values extracted from the amplitude are plotted against time using map function. 
# Other	details:

**Sound Samples	and formula used	in	the	Experiment**

1.	The first sound sample used in the experiment is a phone from voiced sound sample. The initial voiced sound /b/ from word 'Book'. 

2.	The second sound sample used in the experiment is a phone from unvoiced sound sample. The initial unvoiced sample /p/ from word 'Please'.

3.	The features of the distinct sounds e.g. Pitch period, Amplitude can be observed on the time amplitude plot of the two different sound samples 


4.	There is one P5.js loop function draw() which is running to draw the each vertex value of amplitude using the map() against x and y coordinates of the canvas. The length of the sound sample (set at 512 values in P5.FFT() ) is mapped with the x coordinate of the canvas and the amplitude values are mapped with the y coordiante of the canvas. 


6. The current sample in the residue plot is estimated by the sum of previous samples. 	

7.	Now	the	final wave is mapped with the canvas using map function. The amplitude is mapped with the y coordinate and the length of the spectrum is plotted against x coordinate of the canvas. 