angular.module('myApp')
    .controller('MainCtrl', function ($scope, $http) {

        //LOAD IMAGE ON CANVAS
        $scope.setImageFile = function (element) {
            // get the image file from element
            // start to put the file into canvas element
            $scope.init();
            // fileReader
            // onload 
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.image.src = e.target.result;
            };
            reader.readAsDataURL(element.files[0]);
            $scope.image.onload = $scope.resetImage;
        };

        //TODO: FILTER NAMES
        $scope.init = function () {
            // initialize default values for variables
            $scope.brightness = 0;
            $scope.contrast = 1;
            $scope.strength = 50;



            filters = [
            color = {
                    red: 40,
                    green: 20,
                    blue: 10
            },
            color1 = {
                    red: 0,
                    green: 0,
                    blue: 0
            },
            color2 = {
                    red: 20,
                    green: 10,
                    blue: 35
            },
            color3 = {
                    red: 50,
                    green: 50,
                    blue: 50
            },
            color4 = {
                    red: 1,
                    green: 1,
                    blue: 1
            },
            color5 = {
                    red: 10,
                    green: 10,
                    blue: 10
            },
            color6 = {
                    red: 25,
                    green: 50,
                    blue: 15
            },
            color7 = {
                    red: 20,
                    green: 20,
                    blue: 20
            }
            ];


            $scope.autocontrast = false;
            $scope.vignette = false;
            $scope.canvas = angular.element('#myCanvas')[0];
            $scope.ctx = $scope.canvas.getContext('2d');
            $scope.image = new Image();
        };

        $scope.init();

        $scope.resetImage = function () {
            // when image data is loaded, (after onload)
            // set size of canvas to match image size
            //$scope.canvas.height = $scope.image.height;
            //$scope.canvas.width = $scope.image.width;

            // put the data into canvas element
            $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width = $scope.image.width, $scope.canvas.height = $scope.image.height);

            // read pixel data
            $scope.imageData = $scope.ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
            $scope.pixels = $scope.imageData.data;
            $scope.numPixels = $scope.imageData.width * $scope.imageData.height;
        };


        // Generic method for resetting image, applying filters and updating canvas
        $scope.applyFilters = function (value, bright, contr) {
            console.log("value: " + value);
            console.log("brightness: " + bright);
            console.log("contrast: " + contr);
            $scope.resetImage();

            //APPLY FUNCTIONS
            $scope.tint(value);
            $scope.setBrightness(bright);
            $scope.setContrast(contr);

            $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
            $scope.ctx.putImageData($scope.imageData, 0, 0);
        };

        //BIRGHTNESS
        $scope.setBrightness = function (bright) {
            // type of input field value is string and must be parsed to int to make
            // numeric calculations instead of string concatenation
            var brightnessInt = bright;
            // iterate through pixel array and modify values of each pixel one by one 
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] += brightnessInt; // Red
                $scope.pixels[i * 4 + 1] += brightnessInt; // Green 
                $scope.pixels[i * 4 + 2] += brightnessInt; // Blue
            }
        };

        //CONTRAST
        $scope.setContrast = function (contr) {
            // type of input field value is string and must be parsed to float to make
            // numeric calculations instead of string concatenation
            var contrastFloat = contr;
            // iterate through pixel array and modify rgb values of each pixel one by one 
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = ($scope.pixels[i * 4] - 128) * contrastFloat + 128; // Red
                $scope.pixels[i * 4 + 1] = ($scope.pixels[i * 4 + 1] - 128) * contrastFloat + 128; // Green
                $scope.pixels[i * 4 + 2] = ($scope.pixels[i * 4 + 2] - 128) * contrastFloat + 128; // Blue

            }
        };

        //CHANGE COLOURS
        $scope.tint = function (value) {
            console.log("value: " + value);


            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = $scope.pixels[i * 4] + filters[value].red * $scope.strength / 100; // Red
                $scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] + filters[value].green * $scope.strength / 100; // Green
                $scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] + filters[value].blue * $scope.strength / 100; // Blue
            }
        };

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        }


        //MEME STUFF
        $scope.applyText = function () {
            var upperText = document.getElementById('upperText').value;
            var lowerText = document.getElementById('lowerText').value;
            console.log("upper text: " + upperText);
            console.log("lower text: " + lowerText);

            //MAKE TEXT MEME STYLISH LIKE
            $scope.ctx.lineWidth = 5;
            $scope.ctx.font = '100% sans-serif';
            $scope.ctx.strokeStyle = 'black';
            $scope.ctx.fillStyle = 'white';
            $scope.ctx.textAlign = 'center';
            $scope.ctx.lineJoin = 'round';


            //UPPER TEXT
            x1 = $scope.canvas.width / 2;
            y1 = $scope.canvas.height * 0.1;
            console.log("y1: " + y1);
            $scope.ctx.strokeText(upperText, x1, y1);
            $scope.ctx.fillText(upperText, x1, y1);

            //LOWER TEXT
            x2 = $scope.canvas.width / 2;
            y2 = $scope.canvas.height * 0.9;
            console.log("y2: " + y2);
            $scope.ctx.strokeText(lowerText, x2, y2);
            $scope.ctx.fillText(lowerText, x2, y2);
        };


        $scope.sendImage = function () {
            var fd = new FormData(document.getElementById('upload'));
            var userId = localStorage.getItem('userId');
            fd.append('user', userId);
            fd.append('type', "image");
            fd.append("file", dataURItoBlob($scope.canvas.toDataURL()));
            var request = $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });

            request.then(function (response) {
                console.log(response);
                alert("File uploaded successfully!");
            }, function (error) {
                console.log(error);
            });
        };

    })
    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/ˆ\s*(https?|ftp|mailto|coui|data):/);

    });