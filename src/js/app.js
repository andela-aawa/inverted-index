/* globals FileReader document */

angular.module('IndexApp', [])

.controller('IndexCtrl', ['$scope', ($scope) => {
  const index = new InvertedIndex();

  $scope.filenames = [];
  $scope.filename = null;
  $scope.message = '';
  $scope.docCount = 0;
  $scope.searchResults = null;
  $scope.showSearchResults = false;
  $scope.showIndex = false;

  // Set $scope message
  $scope.setMessage = (message) => {
    $scope.$apply(() => {
      $scope.message = message;
    });
  };

  // Create index
  $scope.createIndex = (file) => {
    if (!file.name.toLowerCase().match(/\.json$/)) {
      $scope.setMessage(` ${file.name} is not a JSON file.`);
      return;
    }

    const title = file.name.split('.')[0];
    const reader = new FileReader();

    // Read uploaded file
    reader.onloadend = (e) => {
      try {
        $scope.setMessage('');
        const data = JSON.parse(e.target.result);

        // validate file
        if (!InvertedIndex.validate(data)) {
          $scope.setMessage(`${file.name} Invalid JSON format.`);
          return;
        }

        // Create Index
        index.createIndex(title, data);
        // set currentIndex
        $scope.$apply(() => {
          $scope.filenames.push(title);
        });
      } catch (ex) {
        $scope.setMessage(`${file.name} Invalid JSON format.`);
      }
    };

    reader.readAsText(file);
  };

  // Set the selected Index
  $scope.setIndex = (title) => {
    $scope.message = '';
    $scope.index = index.getIndex(title);
    $scope.filename = title;
    $scope.showIndex = true;
    $scope.showSearchResults = false;
  };

  // Search
  $scope.search = () => {
    $scope.searchResults = index.searchAllIndexes($scope.query);
    $scope.query = '';
    $scope.showIndex = false;
    $scope.showSearchResults = true;
  };
}])
.filter('range', () => (input, range) => {
  for (let i = 0; i < parseInt(range, 10); i += 1) {
    input.push(i);
  }

  return input;
});

// Document ready.
document.addEventListener('DOMContentLoaded', () => {
  // Attach file upload listener
  document.getElementById('uploadJSON')
    .addEventListener('change', function createFile() {
      if (this.files[0]) {
        angular.element(this).scope().createIndex(this.files[0]);
      }
    });
});
