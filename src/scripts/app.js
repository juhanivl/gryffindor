var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', function ($scope, $http) {

    $scope.showModalReg = false;
    $scope.showModalLogin = false;
    $scope.showModalUpload = false;
    $scope.showModalImageView = false;
    $scope.showModalSettings = false;
    $scope.showModalEdit = false;

    $scope.toggleModalReg = function () {
        $scope.showModalReg = !$scope.showModalReg;

    };

    $scope.toggleModalLogin = function () {
        $scope.showModalLogin = !$scope.showModalLogin;

    };


    $scope.toggleModalUpload = function () {
        $scope.showModalUpload = !$scope.showModalUpload;

    };

    $scope.toggleModalEdit = function () {
        $scope.showModalEdit = !$scope.showModalEdit;
    };

    $scope.toggleModalSettings = function () {
        $scope.showModalSettings = !$scope.showModalSettings;
    };

    $scope.toggleAllModals = function () {
        if ($scope.showModalReg || $scope.showModalLogin === true || $scope.showModalUpload === true || $scope.showModalSettings === true || $scope.showModalEdit === true) {
            $scope.showModalLogin = false;
            $scope.showModalReg = false;
            $scope.showModalUpload = false;
            $scope.showModalSettings = false;
            $scope.showModalEdit = false;
        }
    };


    var active = false;
    var active2 = false;
    var active3 = false;

    var color = '#8FD8D8';
    var color2 = '#FF3030';
    var color3 = '#FFFF00';


    $scope.toggleColorBlue = function () {

        active = !active;
        active2 = false;
        active3 = false;
    };

    $scope.toggleColorRed = function () {

        active2 = !active2;
        active = false;
        active3 = false;
    };

    $scope.toggleColorYellow = function () {

        active3 = !active3;
        active = false;
        active2 = false;
    };


    $scope.giveColor = function () {
        if (active) {
            return color;
        } else if (active2) {
            return color2;
        } else if (active3) {
            return color3;
        }
    };

    $scope.giveColor2 = function () {
        if (active) {
            return color2;
        }
    };

    $scope.giveColor3 = function () {
        if (active) {
            return color3;
        }
    };




    $scope.user = {
        username: '',
        title: '',
        description: '',
        type: ''
    };

    $scope.setMediaFile = function (element) {
        $scope.mimeType = element.files[0].type;
        $scope.type = $scope.mimeType.substr(0, 5);
    };

    $scope.sendImage = function () {
        var fd = new FormData(document.getElementById('fileForm'));
        fd.append('user', 6);
        fd.append('type', $scope.type);
        fd.append('mime-type', $scope.mimeType);
        var request = $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });

        request.then(function (response) {
            console.log(response);
            alert("Uploaded successfully!");
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.getMediaUrl = function(url){
        return $sce.trustAsResourceUrl(url);
    };
    
});




angular.module('myApp')
    .controller('MainCtrl', function ($scope, $http) {



        $scope.sendImage = function () {
            var fd = new FormData(document.getElementById('uploadForm'));
            fd.append('user', 6);
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
            }, function (error) {
                console.log(error);
            });
        };




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

        $scope.init = function () {
            // initialize default values for variables
            $scope.brightness = 0;
            $scope.contrast = 1;
            $scope.strength = 1;
            $scope.color = {
                red: 255,
                green: 189,
                blue: 0
            };
            $scope.autocontrast = false;
            $scope.vignette = false;
            $scope.canvas = angular.element('#myCanvas')[0];
            $scope.ctx = $scope.canvas.getContext('2d');
            $scope.image = new Image();

            $scope.vignImage = new Image();
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


            //LOAD VIGENTTE IMAGE
            if ($scope.vignImage.src === ('')) {
                $scope.vignImage.onload = $scope.resetVign;
                $scope.vignImage.src = 'images/vignette.jpg';
            }
            console.log($scope.vignImage);
        };


        // Generic method for resetting image, applying filters and updating canvas
        $scope.applyFilters = function () {
            $scope.resetImage();

            $scope.setBrightness();
            $scope.setContrast();
            $scope.tint();
            if ($scope.vignette) {
                $scope.setVignette();
            }
            $scope.resetVign();

            $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
            $scope.ctx.putImageData($scope.imageData, 0, 0);
            $scope.saveImage();
        };

        // FILTERS

        $scope.setBrightness = function () {
            // type of input field value is string and must be parsed to int to make
            // numeric calculations instead of string concatenation
            var brightnessInt = parseInt($scope.brightness);
            // iterate through pixel array and modify values of each pixel one by one 
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] += brightnessInt; // Red
                $scope.pixels[i * 4 + 1] += brightnessInt; // Green 
                $scope.pixels[i * 4 + 2] += brightnessInt; // Blue
            }
        };

        $scope.setContrast = function () {
            // type of input field value is string and must be parsed to float to make
            // numeric calculations instead of string concatenation
            var contrastFloat = parseFloat($scope.contrast);
            // iterate through pixel array and modify rgb values of each pixel one by one 
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = ($scope.pixels[i * 4] - 128) * contrastFloat + 128; // Red
                $scope.pixels[i * 4 + 1] = ($scope.pixels[i * 4 + 1] - 128) * contrastFloat + 128; // Green
                $scope.pixels[i * 4 + 2] = ($scope.pixels[i * 4 + 2] - 128) * contrastFloat + 128; // Blue

            }
        };

        //
        $scope.tint = function () {

            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = $scope.pixels[i * 4] + $scope.color.red * $scope.strength / 100; // Red
                $scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] + $scope.color.green * $scope.strength / 100; // Green
                $scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] + $scope.color.blue * $scope.strength / 100; // Blue
            }
        };

        $scope.resetVign = function () {
            //make cn the same widht and height as the image
            var cn = document.createElement('canvas');
            cn.width = $scope.image.width;
            cn.height = $scope.image.height;
            //get the context of the cn
            var ctx = cn.getContext('2d');
            //draw the vignette image to ctx
            ctx.drawImage($scope.vignImage, 0, 0, $scope.vignImage.width, $scope.vignImage.height, 0, 0, cn.width, cn.height);
            $scope.vignData = ctx.getImageData(0, 0, cn.width, cn.height);
            //this gets the image data o
            $scope.vignPixels = $scope.vignData.data;
            //get the pixes from image data

        };

        $scope.setVignette = function () {
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = $scope.pixels[i * 4] * $scope.vignPixels[i * 4] / 255; // Red
                $scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] * $scope.vignPixels[i * 4 + 1] / 255; // Green
                $scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] * $scope.vignPixels[i * 4 + 2] / 255; // Blue
            }
        };

        $scope.saveImage = function () {
            var imgAsDataUrl = $scope.canvas.toDataURL('image/png');
            $scope.url = imgAsDataUrl;
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
    })
    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/ˆ\s*(https?|ftp|mailto|coui|data):/);

    });