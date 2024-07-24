//author: Sang Do


function export_img(){
    const table = document.getElementById('tbl_container');
    const myCanvas = document.getElementById('cv_puzzle');
    html2canvas(document.getElementById("tbl_container")).then(function (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = imgData;
        link.download = "myTable.png";
        link.click();
    });
}
//check non negative values in 1 array
function is_valid_array(arr){
    for (var i=0; i<arr.length; i++){
        if (arr[i] <= 0){
            return false;
        }
    }
    return true;
}
function sum_arr(arr){
    var sum = 0;
    for (var i=0; i<arr.length; i++){
        sum += arr[i];
    }
    return sum;
}
//
function generate_rand(low_num, high_num){
    return Math.round(Math.random()*max_sum) + min_sum;
}
//
function generate_3_sum(min_sum, max_sum){
    var arr = [];
    var sum = Math.round(Math.random()*max_sum) + min_sum;
    //generate 3 numbers that sum by this number
    var num1 = Math.round(Math.random()*sum) + min_sum;
    arr.push(num1);
    var num2 = Math.round(Math.random()*(sum - num1)) + min_sum;
    arr.push(num2);
    var num3 = sum - num1 - num2;
    arr.push(num3);
    while (!is_valid_array(arr)){
        arr = [];
        arr = generate_3_sum(min_sum, max_sum);
    }
    return arr;
}
//cat 1: horizontal puzzle sum
/*

 */
function generate_puzzle_horizontal_formulas(X){

}

//3x3 = 9 numbers plus 6 sums = 15. Input: number of hidden numbers (4, 3)
function generate_3x3_puzzle(hidden_numbers, min_sum, max_sum){
    for (var i=0; i<hidden_numbers; i++){

    }
    var arr = generate_3_sum(5, 20);
    console.log(arr[0] + " + " + arr[1] + " + " + arr[2] + " = " + sum_arr(arr));

}
