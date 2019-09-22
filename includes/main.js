// your javascript goes here

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
]; 




function initiateApp(){
	if (typeof(Storage) !== 'undefined' || typeof(Storage !== 'null')){

		// localStorage.setItem("arraySort",JSON.stringify(pictures));
	
		stored = JSON.parse(localStorage.getItem("arraySort"));

		console.log(stored);
		console.log(typeof(stored));
	}
	else {
		// var stored = pictures;
	}
		 /* advanced: add jquery sortable call here to make the gallery able to be sorted
		 on change, rebuild the images array into the new order  */

	addModalCloseHandler();

	var sortableObj = { //?makes the .sortable obj that holds the events
		start: makeGallery(stored),
		update: findSortOrder
	}
	$('#gallery').sortable(sortableObj); //?makes the pictures sortable and updates the array on change 
	//? makeGallery at the start to create the gallery. console logs the new pictures array after update

	var theGalleryFigure = $('#gallery>figure');
	$(theGalleryFigure).click(displayImage);
}
//? --------finds and logs the current sort order and re arranges pictures array ----------
function findSortOrder(){
	var theOrder = $('#gallery').sortable('toArray',{attribute: 'style'});
	for (var currentImg = 0; currentImg<theOrder.length;currentImg++){
		var valToChangeIndex = theOrder[currentImg].lastIndexOf('images/');
		var changedVal = theOrder[currentImg].slice(valToChangeIndex);//todo finds images/ and removes it everything before it
		valToChangeIndex = changedVal.lastIndexOf('")');
		changedVal = changedVal.slice(0,valToChangeIndex);//todo removes everything after the file extension from ") and on
		theOrder[currentImg] = changedVal; //todo changes the current value to the new string shich is just the images/xxx.xxx
	}
	pictures = theOrder; //todo sets the pictures array to the newly ordered array
	localStorage.setItem("arraySort",JSON.stringify(pictures));
}
//todo ----------makes the gallary----------
function makeGallery(imageArray){
	var pSize = imageArray.length;
	var target = $('#gallery');
	for( var fig = 0; fig < pSize; fig++){
		var bgImg = 'background-image: url('+imageArray[fig]+')';
		var newFig = $('<figure>',{class: 'imageGallery col-xs-12 col-sm-6 col-md-4',style: bgImg, css:{'text-shadow':'1px 1px 2px black',color:'white'} });
		var newFigCap = $('<figcaption>',{text: imageArray[fig].slice(7)});
		$(newFig).append(newFigCap);
		$(target).append(newFig);
	}
	
	//use loops and jquery dom creation to make the html structure inside the #gallery section

	//Create a loop to go through the images in the imageArray
		//create the elements needed for each picture, store the elements in variable

		//attach a click handler to the figure you create.  call the "displayImage" function.  

		//append the element to the #gallery section
	
	// side note: make sure to remove the hard coded html in the index.html when you are done!

}
function addModalCloseHandler(){
	$('.modal-body>img').click(function(){
		$('#galleryModal').modal('hide');
	});
	
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp	
}
function displayImage(){
	var imgSrc = $(this).css('background-image');
	imgSrc = imgSrc.slice(imgSrc.lastIndexOf('images/'));
	imgSrc = imgSrc.slice(0,-2); //todo get the lastindexof value and slices everything before it. then slices 2 off the end to remove ")

	var modTitleIndex = imgSrc.slice(imgSrc.lastIndexOf('.'));
	var modTitle = imgSrc.slice(0,-modTitleIndex.length); //todo finds where the . is on the imgSrc sring and removes that and after
	modTitle = modTitle.slice(7);

	$('.modal-title').text(modTitle);
	var imgTarget = $('.modal-body>img');
	imgTarget.attr('src',imgSrc);//todo Sets the image src attribute to imgSrc

	$('#galleryModal').modal('show');

	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need

	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
		//take a look at the lastIndexOf method

	//change the modal-title text to the name you found above
	//change the src of the image in the modal to the url of the image that was clicked on

	//show the modal with JS.  Check for more info here: 
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
}





