import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSelect,
  CFormLabel,
  CFormInput,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CFormCheck,
} from '@coreui/react'
import TableFieldsComponent from './TableFieldsComponent';
import ModalAddField from './ModalAddField';
import { formatCurrencyBr } from '../../../utils/mask';
import { CDateRangePicker, CTimePicker } from '@coreui/react-pro'
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { usePermission } from '../../../hooks/usePermission';


const NovoFormulario = () => {

  const permission = usePermission();

  if (!permission.canAccess(['ADMIN'])) {
    window.location.href = '/#/dashboard';
  }

  const [listSteps, setListSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [modalFieldVisible, setModalFieldVisible] = useState(false);
  const [processName, setProcessName] = useState('');
  const [bannerImg, setBannerImg] = useState();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [optPayment, setOptPayment] = useState('0');
  const [valueInscription, setValueInscription] = useState("R$ 0,00");
  const [isPaymentBillet, setIsPaymentBillet] = useState(true);
  const [isPaymentCreditCard, setIsPaymentCreditCard] = useState(true);
  const [isPaymentPix, setIsPaymentPix] = useState(true);
  const [dtStartInscription, setDtStartInscription] = useState();
  const [dtEndInscription, setDtEndInscription] = useState();
  const [endTimeInscription, setEndTimeInscription] = useState();
  

  const handleSaveNewForm = async () => {
    if (processName == '') {
      Swal.fire('Atenção', 'Preencha o nome do processo', 'warning');
      return;
    }
    if (listSteps.length == 0) {
      Swal.fire('Atenção', 'Adicione pelo menos um passo', 'warning');
      return;
    }
    if (optPayment == '0') {
      Swal.fire('Atenção', 'Selecione uma opção de pagamento', 'warning');
      return;
    }
    if (dtStartInscription == null || dtEndInscription == null || endTimeInscription == null) {
      Swal.fire('Atenção', 'Preencha as datas de início e fim da inscrição', 'warning');
      return;
    }
    let formData = new FormData();
    formData.append('process_name', processName);
    formData.append('banner_img', bannerImg);
    formData.append('opt_payment', optPayment);
    formData.append('value_inscription', valueInscription);
    formData.append('is_payment_billet', isPaymentBillet);
    formData.append('is_payment_credit_card', isPaymentCreditCard);
    formData.append('is_payment_pix', isPaymentPix);
    formData.append('dt_start_inscription', dtStartInscription);
    formData.append('dt_end_inscription', dtEndInscription);
    formData.append('end_time_inscription', endTimeInscription);
    formData.append('steps', JSON.stringify(listSteps));
    const response = await fetch('/api/formularios', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (data.status == 'success') {
      Swal.fire('Sucesso', 'Formulário cadastrado com sucesso', 'success');
    } else {
      Swal.fire('Erro', 'Erro ao cadastrar formulário', 'error');
    }
  }


  const convertDtInsctiption = (dt) => {
    if (dt) {
      console.log(dt);
      return format(new Date(dt), 'yyyy-MM-dd HH:mm:ss');
    }
    return '';
  }

  const addStep = () => {

    if (title == '' || subTitle == '') {
      Swal.fire('Atenção', 'Preencha os campos de título e sub-título', 'warning');
      return;
    }
    setListSteps([
      ...listSteps,
      {
        step: listSteps.length + 1,
        title: title,
        sub_title: subTitle,
        fields: []
      }
    ]);
    setTitle('');
    setSubTitle('');
  }

  const addField = (step) => {
    setModalFieldVisible(true);
    setStepIndex(step.step - 1);
  }

  const removeField = async (stepIndex, fieldIndex) => {
    let newListSteps = [...listSteps];
    let newFields = [...newListSteps[stepIndex]['fields']];
    newFields.splice(fieldIndex, 1);
    newListSteps[stepIndex]['fields'] = newFields;
    setListSteps(newListSteps);
  }

  const handleValueInscritptionChange = (e) => {
    let value = (e.target.value == '') ? '0' : e.target.value;
    const formattedValue = formatCurrencyBr(value);
    setValueInscription(formattedValue);
  };


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Novo Formulário</strong>
          </CCardHeader>
          <CCardBody>

            <p className="text-medium-emphasis small">
              Preencha atentamente todos as etapas.
            </p>
            <br/>

            <h5 className="text-medium-emphasis mb-3">1) Processo Seletivo</h5>

            <CRow className="mb-3">
                <CCol sm={6}>
                    <CFormInput type="text" id="nameProcessId" label="Digite o nome do formulário" value={processName}  onChange={(e) => setProcessName(e.target.value)}/>
                </CCol>
            </CRow>

            <hr className='mt-4 mb-4'></hr>
            
            <h5 className="text-medium-emphasis mb-3">2) Definir Logo</h5>

            <CRow className="mb-3">
                <CCol sm={10}>
                    <CFormInput type="file" id="fileLogoId" value={bannerImg} onChange={(e) => setBannerImg(e.target.value)} />
                </CCol>
            </CRow>

            <hr className='mt-4 mb-4'></hr>

            <h5 className="text-medium-emphasis mb-3">3) Definir Etapas</h5>

            <CRow className="mb-3">
              <CCol sm={3}>
                <CFormInput type="text" id="nameStepId" placeholder='Título da Etapa' value={title}  onChange={(e) => setTitle(e.target.value)}/>
              </CCol>
              <CCol sm={3}>
                <CFormInput type="text" id="subNameStepId" placeholder='Descrição da Etapa' value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
              </CCol>
              <CCol sm={2}>
                <CButton type="submit" className="mb-3" onClick={addStep}>
                  Adicionar etapa
                </CButton>
              </CCol>
            </CRow>

            <hr className='mt-4 mb-4'></hr>

            <h5 className="text-medium-emphasis mb-3">4) Configurar Campos das Etapas </h5>

            <CRow className="col-8">
              <CAccordion>

                <CAccordionItem key={1}>
                  <CAccordionHeader>Login - Dados de Login</CAccordionHeader>
                </CAccordionItem>
                {listSteps.map((step, index) => {
                  return (
                      <CAccordionItem key={index+2}>
                        <CAccordionHeader>{step.title} - {step.sub_title}</CAccordionHeader>
                        <CAccordionBody>
                          <CButton type="button" className='ml-4' 
                            onClick={() => {addField(step)}}>
                            Adicionar Campo
                          </CButton>
                          <TableFieldsComponent
                            stepIndex={index}
                            listFields={step.fields}
                            removeField={removeField}
                          />
                        </CAccordionBody>
                      </CAccordionItem>
                  )
                })}
              </CAccordion>
            <ModalAddField
              stepIndex={stepIndex}
              modalFieldVisible={modalFieldVisible}
              setModalFieldVisible={setModalFieldVisible}
              listSteps={listSteps}
              setListSteps={setListSteps}
            />
            </CRow>

            <hr className='mt-4 mb-4'></hr>
            
            <h5 className="text-medium-emphasis mb-3">5) Definir Tipos de Pagamentos</h5>

            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormSelect
                  label="Habilitar pagamento para o formulário de inscrição?"
                  onChange={(e) => {setOptPayment(e.target.value)}}
                  options={[
                    { label: 'Não', value: '0' },
                    { label: 'Sim', value: '1' },
                  ]}
                />
              </CCol>

              <CCol sm={2} style={{ display: (optPayment == '0' ? 'None' : 'block')}}>
                <CFormInput type="text" value={valueInscription} 
                  onChange={(e) => {handleValueInscritptionChange(e)}} id="priceId" label="Valor da Incrição" placeholder='0,00' />
              </CCol>

              <CCol sm={3} className='ml-4' style={{ display: (optPayment === '0' ? 'None' : 'block'), marginLeft: '20pt' }}>
                <CFormCheck id="ccId" value={isPaymentCreditCard} onChange={(e) => setIsPaymentCreditCard(e.target.value)} label="Aceitar Cartão de Crédito" defaultChecked/>
                <CFormCheck id="billetId" value={isPaymentBillet} onChange={(e) => setIsPaymentBillet(e.target.value)} label="Aceitar Boleto" defaultChecked />
                <CFormCheck id="pixId" value={isPaymentPix} onChange={(e) => setIsPaymentPix(e.target.value)} label="Aceitar Pix" defaultChecked />
              </CCol>

            </CRow>

            <hr className='mt-4 mb-4'></hr>

            <h5 className="text-medium-emphasis mb-3">6) Definir Período de Inscrição (Horário de Brasília)</h5>

            <CRow className="mb-3">
              <CCol sm={4}>
                <CDateRangePicker
                  label="Informe o período de inscrição"
                  placeholder={['Data inicial', 'Data final']}
                  startDate={dtStartInscription}
                  onStartDateChange={(e) => {setDtStartInscription(convertDtInsctiption(e))}} 
                  endDate={dtEndInscription} 
                  onEndDateChange={(e) => {setDtEndInscription(convertDtInsctiption(e))}}  
                />
              </CCol>
              <CCol sm={4}>
                <CTimePicker
                  label="Informe o horário de encerramento da inscrição"
                  placeholder='00:00:00'
                  time={endTimeInscription}
                  onTimeChange={(e) => {setEndTimeInscription(e)}}
                />
              </CCol>
            </CRow>

            <hr className='mt-4 mb-4'></hr>
            
            <CRow>
              <CCol className='text-end' sm={11}>
                <CButton type="submit" className="btn-secondary mb-3 mr-4" style={{ marginRight: '10pt' }} onClick={() => window.location = '/'}>
                  Voltar
                </CButton>
                <CButton type="submit" className="mb-3" onClick={addStep}>
                  Salvar
                </CButton>
              </CCol>
            </CRow>
           
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NovoFormulario
