
function supportPay(cups, query){

    var paymentCount = document.querySelector('.payment-count');
    paymentCount.innerHTML = '$';
    paymentCount.innerHTML += cups * 5;

    var supportCount = document.querySelector('.support-count');
    supportCount.innerHTML = paymentCount.innerHTML;

    var boxs = document.querySelectorAll('.pay-box');

    boxs.forEach(element => {

        if(element.classList.contains(query)){
            element.classList.toggle('selected-box');
        }else{
            element.classList.remove('selected-box');            
        }    
    });

    
}
