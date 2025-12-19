import Category from "../components/Category"
import GetShopByCity from '../components/GetShopByCity'
import ItemByCity from "../components/ItemByCity"


const UserLayout = () => {
  
  return (
    <div className="px-5 sm:px-15 bg-orange-50">
      <Category />
      <GetShopByCity />
      <ItemByCity />
    </div>
  )
}

export default UserLayout