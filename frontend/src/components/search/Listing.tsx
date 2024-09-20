// author: Smit Patel
import ListingItem, { IListingItem } from './ListingItem'

interface ListingsProps {
  listings: IListingItem[];
}


const Listings = (props: ListingsProps) => {
  return (
    <>
      <div>
        {
          props.listings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))
        }
      </div>
      <div className='flex justify-end'>
        {/* <Pagination className='mt-4'  count={10} color="primary" /> */}
      </div>
    </>
  )
}

export default Listings