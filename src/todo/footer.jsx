import '../assets/styles/footer.scss'

export default {
    data(){
        return{
            author:'jessciaWu'
        }
    },
    render(){
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}