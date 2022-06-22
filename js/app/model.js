'use strict';

function model(){
    const isEmptyString = key => !!key.trim();


    return{
        todoKey : null,
        setData(){

            const dataFromLocalStorage = localStorage.getItem(this.todoKey);
            console.log(dataFromLocalStorage)
            let localData = dataFromLocalStorage ? this.getData() : [];
            console.log(localData);

            const idStart = (!(localData.at(-1)))? 1 : localData.at(-1).id+1;
            function* idMaker(id){
                let index = id;
                while(true)
                    yield index++;
            }
            const it = idMaker(idStart)


            return (data)=>{
                let response = null;
                const saveDate = structuredClone(data);
                saveDate.id = it.next().value;
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
            }
        },
        getData(){
            return JSON.parse(localStorage.getItem(this.todoKey))
        },
        init(key) {
            if(!isEmptyString(key)) throw new Error('No key provided');
            this.todoKey = key;
        },
    }

}