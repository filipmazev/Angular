namespace dotnet_rpg.Services.CharacterService
{
    public class CharacterService : ICharacterService
    {
        private readonly IRepository<Character> _repository;
        private readonly IMapper _mapper;

        // Injecting the repository and mapper
        public CharacterService(IRepository<Character> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetCharacterDto>>> GetAllCharacters()
        {
            // Access database, pull characters from database 
            var dbCharacters = await _repository.GetAllAsync();
            
            var ServiceResponse = new ServiceResponse<List<GetCharacterDto>>
            {
                Data = dbCharacters.Select(character => _mapper.Map<GetCharacterDto>(character)).ToList()
            };

            return ServiceResponse;      
        }

        public async Task<ServiceResponse<GetCharacterDto>> GetCharacterById(int id)
        {
            var dbCharacter = await _repository.GetByIdAsync(id);

            if (dbCharacter == null)
            {
                return new ServiceResponse<GetCharacterDto>
                {
                    Success = false,
                    Message = $"Character with {id} not found."
                };
            }

            var ServiceResponse = new ServiceResponse<GetCharacterDto>
            {
                Data = _mapper.Map<GetCharacterDto>(dbCharacter)
            };

            return ServiceResponse;
        }

        public async Task<ServiceResponse<List<GetCharacterDto>>> AddCharacter(AddCharacterDto newCharacter)
        {
            var character = _mapper.Map<Character>(newCharacter);
            await _repository.AddAsync(character);

            return await GetAllCharacters();
        }

        public async Task<ServiceResponse<GetCharacterDto>> UpdateCharacter(UpdateCharacterDto updatedCharacter)
        {
            var character = await _repository.UpdateAsync(_mapper.Map<Character>(updatedCharacter));
            
            if (character == null)
            {
                return new ServiceResponse<GetCharacterDto>
                {
                    Success = false,
                    Message = $"Character with {updatedCharacter.Id} not found."
                };
            }

            return new ServiceResponse<GetCharacterDto>
            {
                Data = _mapper.Map<GetCharacterDto>(character)
            };
        }

        public async Task<ServiceResponse<List<GetCharacterDto>>> DeleteCharacter(int id)
        {
            var character = await _repository.DeleteAsync(id);

            if (character == false)
            {
                return new ServiceResponse<List<GetCharacterDto>>
                {
                    Success = false,
                    Message = $"Character with {id} not found."
                };
            }

            return await GetAllCharacters();
        }
    }
}