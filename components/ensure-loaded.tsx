// NO LONGER USED, SHOULD BE REMOVED

// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { fetchDrinksIfNeeded } from '../redux/actions/drinks-actions';
// import Loader from './loader';

// type Props = {
//   required?: string[];
// };
// type EnhancedProps = Props & {
//   drinksLoaded: boolean;
//   drinksLoading: boolean;
//   fetchDrinks: () => void;
// };
// const EnsureLoaded: React.FC<EnhancedProps> = ({
//   required = [],
//   drinksLoaded,
//   drinksLoading,
//   fetchDrinks,
//   children,
// }) => {
//   const [dataLoading, setDataLoading] = useState(false);

//   useEffect(() => {
//     const conditions = [];

//     if (required.indexOf('drinks') > -1) {
//       conditions.push(drinksLoading);
//     }

//     const result = conditions.some(condition => condition);
//     setDataLoading(result);
//   }, [drinksLoading, dataLoading]);

//   useEffect(() => {
//     if (required.indexOf('drinks') > -1 && !drinksLoaded) {
//       fetchDrinks();
//     }
//   });

//   if (dataLoading) {
//     return <Loader />;
//   }

//   return <React.Fragment>{children}</React.Fragment>;
// };

// const mapStateToProps = state => {
//   return {
//     drinksLoaded: state.drinks.loaded,
//     drinksLoading: state.drinks.loaded,
//     // loading: getDrinksLoading(state),
//     // drinks: state.drinks.items,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchDrinks: () => dispatch(fetchDrinksIfNeeded()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EnsureLoaded);
