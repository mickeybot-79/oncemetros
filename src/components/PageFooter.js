import { useGetPageViewsQuery } from "./pageApiSlice"
import LoadingIcon from "./LoadingIcon"

const PageFooter = () => {

    const {
        data: views,
        isSuccess,
        isLoading
    } = useGetPageViewsQuery('viewsList', {
        pollingInterval: 600000,
        refetchOnMountOrArgChange: true
    })

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {
        return (
            <footer id="page-footer">
                <div>
                    <p>Visitas a la página: {views.allViews}</p>
                </div>
                <div>
                    <p>Contacto</p>
                    {/*Link to Contact Us page */}
                </div>
                <div>
                    <p>Reportar un problema</p>
                    {/*Link to Contact Us page */}
                </div>
                {/*Donate*/}
                {/* <div>
                    <p>Donar</p>
                </div> */}
                <div>
                    <p>Desarrollado por Michael Pérez</p>
                    {/*Link to developer page or LinkedIn*/}
                </div>
            </footer>
        )
    }

}

export default PageFooter