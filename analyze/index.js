var type = process.argv[ 2 ];

switch( type ){
    case 'analyzeOrg':
        require( './analyzeOrg' )();
}