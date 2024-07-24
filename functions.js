//author: Sang Do
//https://www.w3schools.com/charsets/ref_utf_math.asp
const ICO_SQUARE = '&#8865;';
const ICO_INFINITE = '&infin;';
const ICO_DIA = '&nabla;';
const ICO_FORALL= '&forall;';
const ICO_PART = '&part;';

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
//random number in between [0,3]
function my_rand(min_num, max_num){
    return Math.floor(Math.random()*max_num) + min_num;
}
//random number in between [0,3]
function my_rand_0_3(){
    return Math.floor(Math.random()*3) + 0;
}
//random number in between [1,3]
function my_rand_1_3(){
    return Math.floor(Math.random()*3) + 1;
}
//random number in between [1,3]
function my_rand_0_2(){
    return Math.floor(Math.random()*2) + 0;
}
//
function generate_3_sum(min_sum, max_sum){
    var arr = [];
    var sum = Math.floor(Math.random()*max_sum) + min_sum;
    //generate 3 numbers that sum by this number
    var num1 = Math.floor(Math.random()*sum) + min_sum;
    arr.push(num1);
    var num2 = Math.floor(Math.random()*(sum - num1)) + min_sum;
    arr.push(num2);
    var num3 = sum - num1 - num2;
    arr.push(num3);
    while (!is_valid_array(arr)){
        arr = [];
        arr = generate_3_sum(min_sum, max_sum);
    }
    return arr;
}
//print line
function sum_line_with_result(num, X, resultY){
    if (num == 0){
        return '';
    }
    var strY = [];
    for (var i=0; i<num; i++){
        strY.push(X);
    }
    return strY.join(' + ') + ' = ' + resultY;
}
//print line
function sum_line(num, X){
    if (num == 0){
        return '';
    }
    var strY = [];
    for (var i=0; i<num; i++){
        strY.push(X);
    }
    return strY.join(' + ');
}
function randomSign() {
    // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive)
    return Math.random() < 0.5 ? 1 : -1;
}
//cat 1: horizontal puzzle sum
/*
Y = r0 * X
Z = r1 * X +/- r2 * Y + r3
K1 = r4 * X +/- r5 * Y + r6 * Z + r7
K1 = r8 * X +/- r9 * Y + r10 * Z +/- r11
 */
function generate_puzzle_horizontal_formulas_4_gems(X, r, sums){
    r.push(my_rand(2,3));  //r0
    var Y = r[0] * X;
    sums.push(Y);
    // console.log(sum_line_with_result(r[0], X, Y));
    r.push(my_rand_0_3());  //r1
    r.push(my_rand_0_3() * randomSign());  //r2
    r.push(my_rand(0,10) * randomSign());
    var Z = r[1] * X + r[2] * Y + r[3];
    sums.push(Z);
    // console.log(Z);
    r.push(my_rand_0_3());  //r4
    r.push(my_rand_0_2() * randomSign());  //r5, to avoid too large number
    r.push(my_rand_0_2());  //r6
    r.push(my_rand(0,10));  //r7
    var K1 = r[4] * X + r[5] * Y + r[6] * Z + r[7];
    sums.push(K1);
    // console.log(K1);
    //1 more random formula
    r.push(r[my_rand(0,5)]);  //r8
    r.push(r[my_rand(0,5)] * randomSign());  //r9
    r.push(r[my_rand(0,5)]);  //r10
    r.push(my_rand(0,10) * randomSign());   //r11
    var K2 = r[8] * X + r[9] * Y + r[10] * Z + r[11];
    sums.push(K2);
    // console.log(K2);
    //
    return r;
}
//check non negative numbers
function is_positive_array(sums){
    for (var i=0; i<sums.length; i++){
        if (sums[i] <= 0){
            return false;
        }
    }
    return true;
}
//
function generate_puzzle_horizontal_formulas_4_gems_with_print(){
    var X = my_rand(1,5);
    var r = [];
    var sums = [];  //results of each line
    generate_puzzle_horizontal_formulas_4_gems(X, r, sums);
    while (!is_positive_array(sums)){
        //generate other matrices
        var X = my_rand(1,5);
        var r = [];
        var sums = [];  //results of each line
        generate_puzzle_horizontal_formulas_4_gems(X, r, sums);
    }
    console.log('X: ' + X);
    console.log(r);
    console.log(sums);
    //print puzzle
    //print Y
    $('.row1', $('#hoz_puzzle')).html(sum_line_with_result(r[0], ICO_FORALL, sums[0]));
    //print Z = r[1] * X + r[2] * Y + r[3];

    //print K1 = r[4] * X + r[5] * Y + r[6] * Z + r[7];

    //print K2 = r[8] * X + r[9] * Y + r[10] * Z + r[11];


}

//3x3 = 9 numbers plus 6 sums = 15. Input: number of hidden numbers (4, 3)
function generate_3x3_puzzle(hidden_numbers, min_sum, max_sum){
    for (var i=0; i<hidden_numbers; i++){

    }
    var arr = generate_3_sum(5, 20);
    console.log(arr[0] + " + " + arr[1] + " + " + arr[2] + " = " + sum_arr(arr));

}
