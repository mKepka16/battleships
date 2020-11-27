const setSetUpTurn = () => {
    const warships2Select = document.querySelectorAll('.row');

    lastElement = warships2Select[0];
    lastElement.classList.add('chosen');

    warships2Select.forEach(warship2Select => {
        warship2Select.addEventListener('click', e => {
            if(warship2Select == lastElement) return;
            chosenWarship = parseInt(warship2Select.getAttribute('data-length'));;
            warship2Select.classList.add('chosen');
            lastElement.classList.remove('chosen');

            lastElement = warship2Select;
        });
    });
}

const handleMouseEvent = (field, action='add') => {
    let [x, y] = getFieldCords(field);
    fieldType = 'goodPlace';
    
    if(!isDirectionVertical) { // poziomo
        if(x > 11-chosenWarship) x = 11-chosenWarship;
        if(!checkWarshipPlace(parseInt(x), parseInt(y), parseInt(chosenWarship), isDirectionVertical)) fieldType = 'badPlace';

        for(let i=x; i<parseInt(x)+parseInt(chosenWarship); i++) {
            if(action == 'add') findField(i, y).classList.add(fieldType);
            else findField(i, y).classList.remove(fieldType);
        }
    }
    else {
        if(y > 11-chosenWarship) y = 11-chosenWarship;
        if(!checkWarshipPlace(parseInt(x), parseInt(y), parseInt(chosenWarship), isDirectionVertical)) fieldType = 'badPlace';

        for(let i=y; i<parseInt(y)+parseInt(chosenWarship); i++) {
            if(action == 'add') findField(x, i).classList.add(fieldType);
            else findField(x, i).classList.remove(fieldType);
        }
    }
}

const giveFieldsEvents = () => {
    const fields = document.querySelectorAll('.playerBoard .field');

    fields.forEach(field => {
        field.addEventListener('mouseenter', () => {
            handleMouseEvent(field);
        });

        field.addEventListener('mouseleave', () => {
            handleMouseEvent(field, 'remove');
        });

        field.addEventListener('contextmenu', e => {
            e.preventDefault();

            handleMouseEvent(field, 'remove');
            isDirectionVertical = isDirectionVertical ? false : true;
            handleMouseEvent(field);
        });

        field.addEventListener('click', () => {
            let [x, y] = getFieldCords(field);

            if(!isDirectionVertical) {
                if(x > 11-chosenWarship) x = 11-chosenWarship;
                for(let i=x; i<parseInt(x)+parseInt(chosenWarship); i++)
                    findField(i, y).classList.remove('goodPlace');
            }
            else {
                if(y > 11-chosenWarship) y = 11-chosenWarship;
                for(let i=y; i<parseInt(y)+parseInt(chosenWarship); i++)
                    findField(x, i).classList.remove('goodPlace');
            }

            if(fieldType == 'goodPlace') {
                addWarship(parseInt(x), parseInt(y), parseInt(chosenWarship), isDirectionVertical);
                lastElement.parentNode.removeChild(lastElement);
                lastElement = document.querySelector('.row');
                if(lastElement != null) {
                    chosenWarship = lastElement.getAttribute('data-length');
                    lastElement.classList.add('chosen');
                }
                else {
                    endInitalGame();
                }
            }
        });
    });
}

const removeFieldsEvents = () => {
    const fields = document.querySelectorAll('.playerBoard .field');

    fields.forEach(field => {
        var newField = field.cloneNode(true);
        field.parentNode.replaceChild(newField, field);
    });
}

const startMidGameButtonInit = () => {
    const button = document.createElement('button');
    button.innerText = 'Rozpocznij grę';
    button.classList.add('midgameButton');

    button.addEventListener('click', startMidGame);

    document.querySelector('.game').appendChild(button);
}
