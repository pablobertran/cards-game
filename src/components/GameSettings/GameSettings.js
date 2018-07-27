import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

class GameSettings extends Component {

    state = {
        settingsForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: false,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            playersQty: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, displayValue: '2 Players'},
                        {value: 2, displayValue: '3 Players'},
                        {value: 3, displayValue: '4 Players'},
                        {value: 4, displayValue: '5 Players'}
                    ]
                },
                value: 1,
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
        player: {
            name: '',
            email: '',
            players: 1
        }
    }

    gameStartHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.settingsForm) {
            formData[formElementIdentifier] = this.state.settingsForm[formElementIdentifier].value;
        }

        this.props.defineGameSettings(formData);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedsettingsForm = {
            ...this.state.settingsForm
        };
        const updatedFormElement = {
            ...updatedsettingsForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedsettingsForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedsettingsForm) {
            formIsValid = updatedsettingsForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({settingsForm: updatedsettingsForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.settingsForm) {
            formElementsArray.push({
                id: key,
                config: this.state.settingsForm[key]
            });
        }

        return (
            <Aux>
                <form onSubmit={this.gameStartHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>START</Button>
                </form>
            </Aux>
        );
    }
}

export default GameSettings;