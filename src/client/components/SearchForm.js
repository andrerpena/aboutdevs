import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import FormGroup from './form/FormGroup';
import SelectLocation from './SelectLocation';
import FormRow from './form/FormRow';
import FormColumn from './form/FormColumn';

let SearchForm = (props) => {
    const { handleSubmit } = props;
    return (<div className="search-criteria">
        <form onSubmit={handleSubmit}>
            <FormRow>
                <FormColumn eq>
                    <FormGroup label="Profissional ou serviço" labelFor="text">
                        <Field
                            name="professional"
                            component="input"
                            type="text"
                            className="form-control"
                        />
                    </FormGroup>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn eq>
                    <FormGroup label="Localizado próximo a" labelFor="location">
                        <Field
                            name="location"
                            component={SelectLocation}
                            allowCities
                        />
                    </FormGroup>
                </FormColumn>
            </FormRow>
            <button type="submit" className="vibrant">
                <i className="fa fa-search" aria-hidden="true" />
                <span>Pesquisar</span>
            </button>
        </form>
    </div>);
};

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

// Decorate with redux-form
SearchForm = reduxForm({
    form: 'search' // a unique identifier for this form
})(SearchForm);

export default SearchForm;