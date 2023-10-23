import ListingSection from './listing';

const Listing = () => {
  return (
    <>
      <div className="relative mt-32 font-poppins">
        {/* for bg color */}
        <div className="w-full px-4 py-12 2xl:container sm:px-6 xl:px-20 2xl:mx-auto 2xl:px-0 ">
          <ListingSection />
        </div>
      </div>
    </>
  );
};

export default Listing;
