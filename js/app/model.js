'use strict';

function model(){
    const isEmptyString = key => !!key.trim();
    function* idMaker(id){
        let index = id;
        while(true)
            yield index++;
    }

    return{
        todoKey : null,


        setData(data){
            const saveDate = structuredClone(data);
            const dataFromLocalStorage = localStorage.getItem(this.todoKey);
            const localData = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];
            console.log(localData);
            let idStart = (!(localData.at(-1)))? 1 : localData.at(-1).id+1;
            console.log(idStart);
            let id = idMaker(idStart)
            let response = null;

            saveDate.id = id.next().value;
            saveDate.status = 'no-status';

            localData.push(saveDate);
            console.log(localData)
            try{
                localStorage.setItem(this.todoKey,JSON.stringify(localData));
                response = {
                    success: true,
                    data: saveDate,
                    fullData: localData,
                }
            }
            catch (e){
                response = {
                    success: false,
                    errors: e,
                }
            }
            console.log(response);
            return response;
        },
        getData(){
            return JSON.parse(localStorage.getItem(this.todoKey))
        },
        reloadData(data,id){

            data.forEach(item => {if(item.id === id) data.splice(data.indexOf(item), 1)});
            localStorage.removeItem(this.todoKey);
            if(!!data.length) localStorage.setItem(this.todoKey,JSON.stringify(data));
        },
        init(key) {
            if(!isEmptyString(key)) throw new Error('No key provided');
            this.todoKey = key;
        },
    }

}