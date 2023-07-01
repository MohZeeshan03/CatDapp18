import './button.scss'

function Button( {width, value, disabledCondition, onClickHandler} ) {

    return (
        <button className={disabledCondition? "mint-btn-disabled" : "mint-btn"} style={{width: width}} disabled={disabledCondition} onClick={onClickHandler}>{value}</button>
    );
}

export default Button;