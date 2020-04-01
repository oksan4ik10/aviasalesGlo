//ДАННЫЕ

const formSearch=document.querySelector('.form-serch'),
inputCitiesFrom=document.querySelector('.input__cities-from'),
dropdownCitiesFrom=document.querySelector('.dropdown__cities-from'),
inputCitiesTo=document.querySelector('.input__cities-to'),
dropdownCitiesTo=document.querySelector('.dropdown__cities-to'),
inputDateDepart=document.querySelector('.input__date-depart');

//ДАННЫЕ
const citiesApi="data/cities.json";
const proxy="https://cors-anywhere.herokuapp.com/",
API="7d767293027d42c00f2f8ad7394fe612",
calendar="http://min-prices.aviasales.ru/calendar_preload";

let city=['Москва','Санкт-Петербург','Рим','Париж','Будва','Прага','Хотьково','Сергиев Посад','Одинцово','Ростов-на-Дону','Балашиха'];


//ФУНКЦИИ

//подключение к API
const getData=(url, callback)=>{
    const request=new XMLHttpRequest(); //делает HTTP-запросы к серверу без перезагрузки страницы. Старый аналог fetch
    
    request.open('GET', url);
    request.addEventListener('readystatechange',()=>{ //событие срабатывает, когда изменяется атрибут документа readyState
        if (request.readyState!==4) return; //пока не вернули ответ
        if(request.status === 200){ //проверяем положительный ли ответ?
            callback(request.response); //передаем данные в функцию, которые получили от сервера
        } else{
            console.error(request.status);
        }
    });
    request.send();

}



//создание списка городов
const showCity=(input,list)=>{
    list.textContent='';
    const inV=new RegExp(input.value,'i');
    const new_ar=[]
   
    
    city.forEach((item)=>{
        if (item.name!==null) {
            const res=item.name.match(inV);
            if (res!==null &&(input.value!=='')){
                
                new_ar.push(res.input);
            } 
        };
     
        return new_ar;
    });
    new_ar.forEach((el)=>{
        let li=document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent=el;
        list.append(li);
    });
};


//добавление городов в инпут по клику
const handlerCity=(el,input,list)=>{
    const target=el.target;
    if (target.tagName.toLowerCase()==='li'){
        input.value=target.textContent;
        list.textContent='';
    }
}

//ОБРАБОТЧИКИ СОБЫТИЙ


//для поля "Откуда"
inputCitiesFrom.addEventListener('input',()=>{showCity(inputCitiesFrom,dropdownCitiesFrom)
});
dropdownCitiesFrom.addEventListener('click',(event)=>{ handlerCity(event,inputCitiesFrom,dropdownCitiesFrom) 
});

//Для поля "Куда"
inputCitiesTo.addEventListener('input',()=>{showCity(inputCitiesTo,dropdownCitiesTo)});
dropdownCitiesTo.addEventListener('click',(event)=>{ handlerCity(event,inputCitiesTo,dropdownCitiesTo)  
});


//ВЫЗОВЫ ФУНКЦИЙ
getData(citiesApi,(data)=>{
    city=JSON.parse(data).filter((el)=> el.name);
});

// getData(proxy+calendar,(data)=>{
//     console.log(data);
// })