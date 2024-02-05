const Home = () => {
    const { user, closeSession, token } = useContext(loginContext);
    const baseUrl = "http://localhost:3333/user/hoteles/";
    const baseUrlImg = "http://localhost:3333/user/images/";
    const [allHotels, setAllHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [filters, setFilters] = useState({
      // Define los filtros iniciales aquí
      // Ejemplo: category: 'lujo', ciudad: 'Paris'
    });
  
    useEffect(() => {
      const getData = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
  
        await axios.get(baseUrl, config).then((res) => {
          setAllHotels(res.data);
          applyFilters(res.data);
        });
      };
  
      getData();
    }, [token]);
  
    const applyFilters = (hotels) => {
      // Implementa la lógica para aplicar los filtros aquí
      // Puedes usar los valores en el estado 'filters' para filtrar 'hotels'
      // Ejemplo:
      const filtered = hotels.filter((hotel) => {
        return (
          (!filters.category || hotel.category === filters.category) &&
          (!filters.ciudad || hotel.ciudad === filters.ciudad)
          // Añade más condiciones según tus filtros
        );
      });
  
      setFilteredHotels(filtered);
    };
  
    useEffect(() => {
      applyFilters(allHotels);
    }, [allHotels, filters]);
  
    const handleFilterChange = (filterName, value) => {
      setFilters({
        ...filters,
        [filterName]: value,
      });
    };
  
    console.log(filteredHotels);
  
    return (
      <div className={style.Home}>
        {/* Agrega aquí tus controles de filtro, por ejemplo, componentes de selección */}
        <FilterComponent
          label="Categoría"
          options={['lujo', 'económico', 'otros']}
          onChange={(value) => handleFilterChange('category', value)}
        />
        <FilterComponent
          label="Ciudad"
          options={['Paris', 'Nueva York', 'otras ciudades']}
          onChange={(value) => handleFilterChange('ciudad', value)}
        />
        
        {filteredHotels.map((el) => (
          <CardHotel hotel={el} key={el.id} />
        ))}
      </div>
    );
  };
  
  export default Home;
  