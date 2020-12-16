unitArray = ['length', 'volume', 'weight']
unitJson = {
    'length':{
        "inch":1,
        "feet":12,
        "yard":36
    }
    , 'volume':{

    }, 'weight':{
        "gram":1000,
        "kilogram":1,
        "tonne":1000
    }
}
inchToFeet = 1*12;
feetToInch = 12/1;

function getValuesForDropdown(dropDownId, otherDropDownId){
    for (element in unitJson[$('#units').val()]){
        if($(otherDropDownId).val() == element){
            continue;
        }
        $(dropDownId).append(`
        <option value="${element}"> ${element}</option>
        `)  
    
    }
}

function getValuesForUnits(){
    unitArray.forEach(element=>
        $('#units').append(`
        <option value="${element}"> ${element}</option>
        `)
    )
}


function onChange(changedDropDownId, otherDropDownId){
    $(document).on('change',changedDropDownId,function(){
        $(otherDropDownId+' > *').remove();
        getValuesForDropdown(otherDropDownId, changedDropDownId)
    })
}

$(document).ready(function(){
    getValuesForUnits();
    getValuesForDropdown('#unit-1','#unit-2');
    getValuesForDropdown('#unit-2', '#unit-1');
    onChange('#unit-1', '#unit-2');
    $(document).on('change','#units',function(){
        $('#unit-1 > *').remove();
        $('#unit-2 > *').remove();
        getValuesForDropdown('#unit-1','#unit-2');
        getValuesForDropdown('#unit-2','#unit-1');
    })
})

