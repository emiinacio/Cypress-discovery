import signupPage from '../pages/SignupPage';
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {
  //GANCHOS 
  // before(function() {
  //   cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
  // })

  // beforeEach(function() {
  //   cy.log('Tudo aqui é executado sempre ANTES de CADA os caso de teste')
  // })

  // after(function() {
  //   cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
  // })

  // afterEach(function() {
  //   cy.log('Tudo aqui é executado sempre DEPOIS de CADA os caso de teste')
  // })

  // beforeEach(function () {
  //   cy.fixture('deliver').then((d) => {
  //     this.deliver = d
  //   })
  // })

  it('User should be deliver', function () {

    let deliver = signupFactory.deliver()

    signupPage.go()
    signupPage.fillForm(deliver)
    signupPage.submit()
    const expetedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signupPage.modalContentShouldBe(expetedMessage)
  })

  it('Incorrect document', function () {

    let deliver = signupFactory.deliver()

    deliver.cpf = '000000141aa'

    signupPage.go()
    signupPage.fillForm(deliver)
    signupPage.submit()
    signupPage.alertMessageShouldBe('Oops! CPF inválido')
  })

  it('Incorrect email', function () {

    let deliver = signupFactory.deliver()

    deliver.email = 'papito.com.br'

    signupPage.go()
    signupPage.fillForm(deliver)
    signupPage.submit()
    signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
  })

 context('Required fields', function () {
    const messages = [
      { field: 'name', output: 'É necessário informar o nome' },
      { field: 'cpf', output: 'É necessário informar o CPF' },
      { field: 'email', output: 'É necessário informar o email' },
      { field: 'postalcode', output: 'É necessário informar o CEP' },
      { field: 'number', output: 'É necessário informar o número do endereço' },
      { field: 'delivery_method', output: 'Selecione o método de entrega' },
      { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
    ]

    before(function (){
      signupPage.go()
      signupPage.submit()
    })

    messages.forEach(function (msg){
      it(`${msg.field} is required`, function() {
        signupPage.alertMessageShouldBe(msg.output)
      })
    })

  })

})