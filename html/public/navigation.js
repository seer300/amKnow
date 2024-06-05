
function navjump(index) {
    console.log("导航index:", index);
    switch (index) {
        case 1:
            // 当元素被点击时，更改浏览器地址并跳转
            window.location.href = 'home.html';
            break;
        case 2:
            window.location.href = 'faultDiagnosis.html';
            break;
        case 3:
            window.location.href = 'caseManage2.html';            
            break;
        case 4:
            window.location.href = 'study.html';
            break;
        default:
            break;
    }
}