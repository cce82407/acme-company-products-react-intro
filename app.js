const { Component } = React;
const { render } = ReactDOM
const e = React.createElement


//Using the class method to create the company elements
class CompanyList extends Component {
    render() {
        const { companies } = this.props
        console.log(this.props)
        const lis = companies.map(company => {
            return e('li', { key: company.id }, company.name)
        })
        return e('ul', null, lis)
    }
}

//Using the function method to create the product elements
const ProductList = ({ products }) => {
    const lis = products.map(product => {
        return e('li', { key: product.id }, product.name)
    })
    return e('ul', null, lis)
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            products: []
        }
    }

    componentDidMount() {
        Promise.all([
            axios.get('https://acme-users-api-rev.herokuapp.com/api/companies'),
            axios.get('https://acme-users-api-rev.herokuapp.com/api/products')
        ])
            .then(reses => reses.map(res => res.data))
            .then(([companies, products]) => {
                this.setState({ companies, products })
            })
    }

    render() {
        const { companies, products } = this.state
        const companyView = e(CompanyList, { companies })
        const productView = e(ProductList, { products })
        const h1 = e('h1', { id: 'h1' }, `We have ${products.length} Products and ${companies.length} Companies`)
        return e('div', null, h1, e('div', { id: 'container' }, companyView, productView))
    }
}

const app = document.getElementById('app')
render(e(App), app)



