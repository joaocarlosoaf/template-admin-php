import { useState } from "react";
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CModal,
    CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

    
const ModalEditField = (props) => {

    let stepIndex = props.stepIndex;
    let modalFieldVisible = props.modalFieldVisible;
    let setModalFieldVisible = props.setModalFieldVisible;
    let listSteps = props.listSteps;
    let setListSteps = props.setListSteps;
    
    const [name, setName] = useState('');
    const [placeHolder, setPlaceHolder] = useState('');
    const [type, setType] = useState('');
    const [required, setRequired] = useState(false);
    const [options, setOptions] = useState('');


    return (
        <>
            <CModal size="lg" alignment="center" visible={modalFieldVisible} onClose={() => setModalFieldVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Adicionar Campo</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <CForm className="row g-3">
                        <CCol md={6}>
                            <CFormInput type="text" id="namelId" label="Nome" onChange={(e) => setName(e.target.value)} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="placeHolderId" label="Place Holder" onChange={(e) => setPlaceHolder(e.target.value)}/>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect id="inputState" label="State" onChange={(e) => setType(e.target.value)}>
                                <option value="text">Texto</option>
                                <option value="number">Número</option>
                                <option value="date">Data</option>
                                <option value="email">E-mail</option>
                                <option value="password">Senha</option>
                                <option value="file">Arquivo</option>
                                <option value="check">Checkbox</option>
                                <option value="radio">Radio</option>
                                <option value="combo">Combo</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6} className={(type == 'combo' || type == 'check') ? 'd-block' : 'd-none'}>
                            <CFormTextarea
                                id="optionsId"
                                label="Opções para combox/checkbox"
                                rows={3}
                                placeholder="Digite as opções separadas por vírgula"
                                text="Deve ter de 2 a 30 palavras."
                                onChange={(e) => setOptions(e.target.value)}
                                >
                            </CFormTextarea>
                        </CCol>
                        <CCol xs={12}>
                            <CFormCheck type="checkbox" id="requiredId" label="Campo obrigatório?" onChange={(e) => setRequired(e.target.value)}/>
                        </CCol>

                    </CForm>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalFieldVisible(false)}>Fechar</CButton>
                    <CButton color="primary" onClick={addField} >Adicionar</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ModalEditField
