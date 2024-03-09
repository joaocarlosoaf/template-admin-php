import React, { createRef, useEffect, useState } from 'react';
import './RegistrationForm.css';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InscriptionService from '../../services/inscriptions';
import { isEmpty, set } from 'lodash';


const RegistrationForm = () => {

  const [refs, setRefs] = useState([]);

  const [actualStep, setActualStep] = useState(1);

  const [userLogged, setUserLogged] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginRequiredError, setShowLoginRequiredError] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);


  const [listaFieldsetsAndFields, setListaFieldsetsAndFields] = useState([
    {
      id: 'login-fieldset',
      step: 1,
      legend: 'Login',
      show: true,
      fields: [
        {
          id: 'user-name-id',
          name: 'user-name',
          label: 'Usuário',
          type: 'text',
          placeholder: 'Digite seu usuário',
        },
        {
          id: 'password-id',
          name: 'password',
          label: 'Senha',
          type: 'password',
          placeholder: 'Digite sua senha',
        },
      ],
    },
    {
      id: 'personal-data-fieldset',
      step: 2,
      legend: 'Dados Pessoais',
      show: false,
      fields: [
        {
          id: 'nome-id',
          name: 'nome',
          label: 'Nome',
          type: 'text',
          placeholder: 'Digite seu nome',
        },
        {
          id: 'cpf-id',
          name: 'cpf',
          label: 'CPF',
          type: 'text',
          placeholder: 'Digite seu CPF',
        },
        {

          id: 'data-nascimento-id',
          name: 'data-nascimento',
          label: 'Data de Nascimento',
          type: 'date',
          placeholder: 'Digite sua data de nascimento',
        },
        {
          id: 'nome-mae-id',
          name: 'nome-mae',
          label: 'Nome da Mãe',
          type: 'text',
          placeholder: 'Digite o nome da sua mãe',
        },
      ],
    },
    {
      id: 'address-fieldset',
      step: 3,
      legend: 'Endereço',
      show: false,
      fields: [
        {
          id: 'cep-id',
          name: 'cep',
          label: 'CEP',
          type: 'text',
          placeholder: 'Digite seu CEP',
        },
        {
          id: 'endereco-id',
          name: 'endereco',
          label: 'Endereço',
          type: 'text',
          placeholder: 'Digite seu endereço',
        },
      ],
    },
  ]);

  const handleLogin = async () => {
    let data = getValuesFieldsLogin();
    if (data.length === 2) {
      setUserName(data[0].value);
      setPassword(data[1].value);
      if (isEmpty(userName) || isEmpty(password)) {
        setShowLoginRequiredError(true);
        return;
      }
      let result = await InscriptionService.loginApplicant({ user_name: userName, password: password });
      if (!result.data.erro) {
        setUserLogged(true);
        setShowLoginError(false);
        handleNextStep();
      }
      else{
        setShowLoginError(true);
      }
    }
  };

  const getValuesFieldsLogin = () => {
    const inputs = refs[0].current.querySelectorAll('input');
    const data = Array.from(inputs).map(input => ({
      name: input.name,
      value: input.value
    }));
    return data;
  };


  const handleNextStep = () => {
    setActualStep(actualStep + 1);
    setListaFieldsetsAndFields(
      listaFieldsetsAndFields.map((fieldset) => {
        if (fieldset.step === actualStep) {
          fieldset.show = false;
        }
        if (fieldset.step === actualStep + 1) {
          fieldset.show = true;
        }
        return fieldset;
      })
    )
  };

  const handlePreviousStep = () => {
    setActualStep(actualStep - 1);
    setListaFieldsetsAndFields(
      listaFieldsetsAndFields.map((fieldset) => {
        if (fieldset.step === actualStep) {
          fieldset.show = false;
        }
        if (fieldset.step === actualStep - 1) {
          fieldset.show = true;
        }
        return fieldset;
      })
    )
  };

  const handleSubmitForm = (index) => {
    if (refs[index] && refs[index].current) {
      const inputs = refs[index].current.querySelectorAll('input');
      const data = Array.from(inputs).map(input => ({
        name: input.name,
        value: input.value
      }));
      console.log(data);
    }
  };

  useEffect(() => {
    console.log('actualStep', actualStep);
  }, [actualStep]);


  useEffect(() => {
    const createRefs = listaFieldsetsAndFields.map(() => createRef());
    setRefs(createRefs);
  }, [listaFieldsetsAndFields]); 

  useEffect(() => {
  }, [refs]);

 
  return (
    <div className='main'>
      <div className="container">
        <div className="p-4">
          <h2>Formulário de Inscrição</h2>
          <br />
          <div className='row justify-content-center'>
            <div className='col'  xs="4" md="8" sm="4">

              <div className='steps'>
                <ul role="tablist" className='tablist'>
                  {
                    listaFieldsetsAndFields.map((fieldset, index) => (

                      <li key={`${fieldset.id}-step`} className="active" role="tab" aria-disabled={!fieldset.legend} aria-selected={fieldset.show}>
                        <a id={`form-total-t-${index}`} href="#" aria-controls={`form-total-p-${index}`}>
                          <span className="current-info audible"> </span>
                          <div className={fieldset.show ? 'title onSelected' : 'title'}>
                            <span className="number">{index+1}</span>
                            <span className="title_text">{fieldset.legend}</span>
                          </div>
                        </a>
                      </li>

                    ))
                  }
                </ul>
              </div>
                
              <br />

              {
                listaFieldsetsAndFields.map((fieldset, index) => (
                  <fieldset key={fieldset.id} ref={refs[index]} style={{ 'display': fieldset.show ? 'block' : 'none' }}>
                    <div className="fieldset-content">
                      {
                        fieldset.fields.map((field) => (
                          <Form.Group as={Row} className="mb-3" controlId={field.id}>
                            <Form.Label column lg="2" md="2" sm="2">{field.label}</Form.Label>
                            <Col lg="6" md="6" sm="6">
                              <Form.Control type={field.type} name={field.name} placeholder={field.placeholder} />
                            </Col>
                            { 
                              field.id === 'password-id' &&
                              <>
                                <Form.Text className="text-muted text-recover-password">
                                  <Button variant="link">Esqueceu a senha?</Button>
                                </Form.Text> 
                                <Alert className='mt-2' variant='danger' show={showLoginError} onClose={() => setShowLoginError(false)}  dismissible>
                                  Usuário ou senha inválidos!
                                </Alert>
                                <Alert className='mt-2' variant='warning' show={showLoginRequiredError} onClose={() => setShowLoginRequiredError(false)}  dismissible>
                                  Os campos Usuário e Senha são obrigatórios!
                                </Alert>
                              </>               
                            }
                          </Form.Group>
                        ))
                      }
                    </div>
                  </fieldset>
                ))
              }
              
            </div>
          </div>

          <div className='row'>

            <div className="col fieldset-footer">
                <span>Etapa { actualStep } de { listaFieldsetsAndFields.length } </span>
            </div>
            <div className='col actions-butons'>
              { actualStep > 1 && 
                <Button variant="secondary" type="button" style={{ marginRight: '20pt' }} onClick={handlePreviousStep}>
                  Voltar
                </Button>
              }
              {
                actualStep < listaFieldsetsAndFields.length && listaFieldsetsAndFields[0].id != 'login-fieldset' &&
                <Button variant="success" type="button" 
                  onClick={handleNextStep} disabled={!userLogged}>
                  Avançar
                </Button>
                ||
                <Button variant="success" type="button" 
                  onClick={handleLogin}>
                  Login
                </Button>
              }

            </div>

          </div>

        </div>
      </div>
    </div>
    
  );


};

export default RegistrationForm;
