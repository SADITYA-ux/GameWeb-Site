import React , { useEffect , useState } from 'react';
import { apiPost , apiGet} from '../api';
import  GameCard  from '../components/GameCard';
import { useSearchParams } from 'react-router-dom';

export default function Shop({addToCart})
{
    const [ games , setGames ] = useState( [] );
    const [ loading , setLoading ] = useState (true);
    const [ params ] = useSearchParams();
    const category = params.get ('category') || '';  // gets category from URL if Xaina then empty string dekaunxa
    const [search , setSearch ] = useState ('');

    useEffect (() =>  //UseEffect means run this block of code when the components renders or update
    {
        let mounted = true;   //mounted means component is still in the DOM
        const fetchGames = async () =>    //async vaneko a function that waits for some operations to complete before proceeding
            {
                setLoading(true);
                const res = await apiGet('games.php' , category ? { category} : { }); 
                if (!mounted) return;  //if component is unmounted then return
                setGames(res.games || []);    //setGames vaneko games state lai update garne
                setLoading(false); 
            } 
            fetchGames();  
            return () => { mounted = false; };    //cleanup function to set mounted to false when component unmounts
    }, [category] );  //dependency array, if category changes then useEffect runs again

    const doSearch = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        const res = await apiGet('games.php', search ? {q : search} : { });  //if search is not empty then send q parameter else send empty object
        setGames(res.games || []);
        setLoading(false);
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h2>ShopGames</h2>
             <form onSubmit={doSearch} style={{ marginBottom: 12 }}>
      <input
        placeholder="Search games..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '70%', marginRight: 8 }}
      />
      <button type="submit">Search</button>
    </form>

    <div className="grid games">
      {games.map(g => <GameCard key={g.id} game={g} onAdd={addToCart} />)}
    </div>
  </div>
)
}