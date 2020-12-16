unitArray = ['length', 'volume', 'weight']
unitJson = {
    'length':{
        "inch":function(value, unit){
            switch(unit){
                case "feet": return value / 12;
                case "yard": return value / 36;
                default: return 0;
            }
        },
        "feet":function(value, unit){
            switch(unit){
                case "inch": return value * 12;
                case "yard": return value / 3;
                default: return 0;
            }
            
        },
        "yard":function(value, unit){
            switch(unit){
                case "inch": return value * 36;
                case "feet": return value * 3;
                default: return 0;
            }
        }
    }
    , 'volume':{
        "gallon": function(value, unit){
            switch(unit){
                case "litre": return value/3.78;
                case "mililitre":  return value/ 3785.41;
                default: return 0;
            }
        },
        "litre": function(value, unit){
            switch(unit){
                case "gallon": return value * 3.78;
                case "mililitre":  return value * 1000;
                default: return 0;
            }
        },"mililitre": function(value, unit){
            switch(unit){
                case "gallon": return value / 3.785;
                case "litre":  return value / 1000;
                default: return 0;
            }
        },

    }, 'weight':{
        "gram":function(value, unit){
            switch(unit){
                case "kilogram": return value / 1000;
                case "tonne":  return value / 1000000;
                default: return 0;
            }
        },
        "kilogram":function(value, unit){
            switch(unit){
                case "gram": return value * 1000;
                case "tonne":  return value / 1000;
                default: return 0;
            }
        },
        "tonne":function(value, unit){
            switch(unit){
                case "gram": return value * 1000000;
                case "litre":  return value * 1000;
                default: return 0;
            }
        }
    }
}


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
        computeValue()
    })
}

function computeValue(){
    $('#input-2 > *').remove();
    value = $('#input-1').val();
    unit = $('#units').val();
    console.log($('#unit-1').val())
    $('#input-2').val(unitJson[unit][$('#unit-1').val()](value, $('#unit-2').val()));
}

$(document).ready(function(){
    getValuesForUnits();
    getValuesForDropdown('#unit-1','#unit-2');
    getValuesForDropdown('#unit-2', '#unit-1');
    onChange('#unit-1', '#unit-2');
    $(document).on('change','#unit-2',function(){
        computeValue()
    })

    $(document).on('change','#units',function(){
        $('#unit-1 > *').remove();
        $('#unit-2 > *').remove();
        getValuesForDropdown('#unit-1','#unit-2');
        getValuesForDropdown('#unit-2','#unit-1');
    })
    $(document).on('keyup','#input-1',function(){
        console.log("Sss")
        computeValue();
    })
})

