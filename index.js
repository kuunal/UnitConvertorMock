unitArray = ['length', 'volume', 'weight']
unitJson = {
    'length':{
        "inch":1,
        "feet":12,
        "yard":36
    }
    , 'Volume':{

    }, 'Weight':{
        "gram":1000,
        "kilogram":1,
        "tonne":1000
    }
}
inchToFeet = 1*12;
feetToInch = 12/1;

function getValuesForDropdown(dropDownId, otherDropDownId){
    for (element in unitJson['length']){
        if($(otherDropDownId).val() == element){
            continue;
        }
        $(dropDownId).append(`
        <option value="${element}"> ${element}</option>
        `)  
    
    }
}

function onChange(changedDropDownId, otherDropDownId){
    $(document).on('change',changedDropDownId,function(){
        $(otherDropDownId+' > *').remove();
        getValuesForDropdown(otherDropDownId, changedDropDownId)
    })
}

$(document).ready(function(){
    getValuesForDropdown('#unit-1','#unit-2');
    getValuesForDropdown('#unit-2', '#unit-1');
    onChange('#unit-1', '#unit-2');
    onChange('#unit-2', '#unit-1');

})

