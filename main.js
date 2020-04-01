const formSearch=document.querySelector('.form-serch'),
inputCitiesFrom=document.querySelector('.input__cities-from'),
dropdownCitiesFrom=document.querySelector('.dropdown__cities-from'),
inputCitiesTo=document.querySelector('.input__cities-to'),
dropdownCitiesTo=document.querySelector('.dropdown__cities-to'),
inputDateDepart=document.querySelector('.input__date-depart');

const city=['Москва','Санкт-Петербург','Рим','Париж','Будва','Прага','Хотьково','Сергиев Посад','Одинцово','Ростов-на-Дону','Балашиха'];

//создание списка городов
const showCity=(input,list)=>{
    list.textContent='';
    const inV=new RegExp(input.value,'i');
    const new_ar=[]
    city.forEach((item)=>{
        const res=item.match(inV);
        if (res!==null &&(input.value!=='')){
            
            new_ar.push(res.input);
        } 
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

//для поля "Откуда"
inputCitiesFrom.addEventListener('input',()=>{showCity(inputCitiesFrom,dropdownCitiesFrom)
});
dropdownCitiesFrom.addEventListener('click',(event)=>{ handlerCity(event,inputCitiesFrom,dropdownCitiesFrom) 
});

//Для поля "Куда"
inputCitiesTo.addEventListener('input',()=>{showCity(inputCitiesTo,dropdownCitiesTo)});
dropdownCitiesTo.addEventListener('click',(event)=>{ handlerCity(event,inputCitiesTo,dropdownCitiesTo)  
});
