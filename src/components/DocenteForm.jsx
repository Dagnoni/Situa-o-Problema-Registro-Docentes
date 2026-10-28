import { useState, useEffect } from 'react';

const UFS = ['', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

export default function DocenteForm({ docenteToEdit, onSave, onCancel }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [formacao, setFormacao] = useState('');
  const [emailInst, setEmailInst] = useState('');
  const [emailPart, setEmailPart] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (docenteToEdit) {
      setNome(docenteToEdit.nome);
      setCpf(docenteToEdit.cpf);
      setFormacao(docenteToEdit.formacao);
      setEmailInst(docenteToEdit.emailInst);
      setEmailPart(docenteToEdit.emailPart);
      setTelefone(docenteToEdit.telefone);
      setEndereco(docenteToEdit.endereco);
      setNumero(docenteToEdit.numero);
      setCidade(docenteToEdit.cidade);
      setCep(docenteToEdit.cep);
      setUf(docenteToEdit.uf);
    }
  }, [docenteToEdit]);

  const formatarCPF = (valor) => valor.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const formatarTel = (valor) => valor.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  const formatarCEP = (valor) => valor.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');

  const validar = () => {
    const novosErros = {};
    if (nome.trim().length < 3) novosErros.nome = 'Minimo 3 caracteres';
    if (cpf.replace(/\D/g, '').length !== 11) novosErros.cpf = 'CPF invalido';
    if (!formacao.trim()) novosErros.formacao = 'Obrigatorio';
    if (!emailInst || !emailInst.includes('@')) novosErros.emailInst = 'Email invalido';
    if (emailPart && !emailPart.includes('@')) novosErros.emailPart = 'Email invalido';
    if (telefone.replace(/\D/g, '').length !== 11) novosErros.telefone = 'Telefone invalido';
    if (!endereco.trim()) novosErros.endereco = 'Obrigatorio';
    if (!numero.toString().trim()) novosErros.numero = 'Obrigatorio';
    if (!cidade.trim()) novosErros.cidade = 'Obrigatorio';
    if (cep.replace(/\D/g, '').length !== 8) novosErros.cep = 'CEP invalido';
    if (!uf) novosErros.uf = 'Selecione';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    onSave({
      id: docenteToEdit?.id || Date.now(),
      nome, cpf, formacao, emailInst, emailPart, telefone, endereco, numero, cidade, cep, uf
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">{docenteToEdit ? 'Alterar Docente' : 'Cadastrar Novo Docente'}</h5>
              <form onSubmit={handleSubmit}>
                <h6 className="mt-3 mb-2 border-bottom">Dados Pessoais</h6>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome Completo</label>
                  <input id="nome" type="text" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(e) => setNome(e.target.value)} />
                  {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="cpf" className="form-label">CPF</label>
                  <input id="cpf" type="text" className={`form-control ${erros.cpf ? 'is-invalid' : ''}`} value={cpf} onChange={(e) => setCpf(formatarCPF(e.target.value))} maxLength="14" />
                  {erros.cpf && <div className="invalid-feedback">{erros.cpf}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="formacao" className="form-label">Formacao</label>
                  <input id="formacao" type="text" className={`form-control ${erros.formacao ? 'is-invalid' : ''}`} value={formacao} onChange={(e) => setFormacao(e.target.value)} />
                  {erros.formacao && <div className="invalid-feedback">{erros.formacao}</div>}
                </div>

                <h6 className="mt-3 mb-2 border-bottom">Contatos</h6>
                <div className="mb-3">
                  <label htmlFor="emailInst" className="form-label">Email Institucional</label>
                  <input id="emailInst" type="email" className={`form-control ${erros.emailInst ? 'is-invalid' : ''}`} value={emailInst} onChange={(e) => setEmailInst(e.target.value)} />
                  {erros.emailInst && <div className="invalid-feedback">{erros.emailInst}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="emailPart" className="form-label">Email Particular</label>
                  <input id="emailPart" type="email" className={`form-control ${erros.emailPart ? 'is-invalid' : ''}`} value={emailPart} onChange={(e) => setEmailPart(e.target.value)} />
                  {erros.emailPart && <div className="invalid-feedback">{erros.emailPart}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="telefone" className="form-label">Telefone</label>
                  <input id="telefone" type="tel" className={`form-control ${erros.telefone ? 'is-invalid' : ''}`} value={telefone} onChange={(e) => setTelefone(formatarTel(e.target.value))} maxLength="15" />
                  {erros.telefone && <div className="invalid-feedback">{erros.telefone}</div>}
                </div>

                <h6 className="mt-3 mb-2 border-bottom">Endereco</h6>
                <div className="mb-3">
                  <label htmlFor="endereco" className="form-label">Endereco</label>
                  <input id="endereco" type="text" className={`form-control ${erros.endereco ? 'is-invalid' : ''}`} value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                  {erros.endereco && <div className="invalid-feedback">{erros.endereco}</div>}
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="numero" className="form-label">Numero</label>
                    <input id="numero" type="text" className={`form-control ${erros.numero ? 'is-invalid' : ''}`} value={numero} onChange={(e) => setNumero(e.target.value)} />
                    {erros.numero && <div className="invalid-feedback">{erros.numero}</div>}
                  </div>
                  <div className="col-md-8 mb-3">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input id="cidade" type="text" className={`form-control ${erros.cidade ? 'is-invalid' : ''}`} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    {erros.cidade && <div className="invalid-feedback">{erros.cidade}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input id="cep" type="text" className={`form-control ${erros.cep ? 'is-invalid' : ''}`} value={cep} onChange={(e) => setCep(formatarCEP(e.target.value))} maxLength="9" />
                    {erros.cep && <div className="invalid-feedback">{erros.cep}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="uf" className="form-label">Estado</label>
                    <select id="uf" className={`form-select ${erros.uf ? 'is-invalid' : ''}`} value={uf} onChange={(e) => setUf(e.target.value)}>
                      {UFS.map((u) => <option key={u || 'vazio'} value={u}>{u || 'Selecione'}</option>)}
                    </select>
                    {erros.uf && <div className="invalid-feedback">{erros.uf}</div>}
                  </div>
                </div>

                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">{docenteToEdit ? 'Atualizar' : 'Cadastrar'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
