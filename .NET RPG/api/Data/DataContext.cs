namespace dotnet_rpg.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        //Create reference for Entity Framework to create a table in the database
        public DbSet<Character> Characters => Set<Character>();
    }
}