using AutoMapper;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mappers
{
    public class MecMapper : Mapping<Mec,MecDTORead,MecDTOInsertUpdate>
    {

        public MecMapper()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.AllowNullDestinationValues = true;
                c.CreateMap<Mec, MecDTORead>()
                .ConstructUsing(entitet =>
                 new MecDTORead(
                    entitet.Id,
                    entitet.Izazivac.Ime + " " + entitet.Izazivac.Prezime,
                    entitet.Izazvani.Ime + " " + entitet.Izazvani.Prezime,
                    entitet.Datum,
                    entitet.Red,
                    entitet.Napomena,
                    entitet.Sezona==null ? entitet.Datum : entitet.Sezona.PocetakSezone,
                    entitet.Sezona == null ? entitet.Datum : entitet.Sezona.KrajSezone,
                    entitet.Pobjednik == null ? "" : (entitet.Pobjednik.Ime + " " + entitet.Pobjednik.Prezime)
                    
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<MecDTOInsertUpdate, Mec>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Mec, MecDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new MecDTOInsertUpdate(
                    entitet.Izazivac.Id,
                    entitet.Izazvani.Id,
                    entitet.Datum,
                    entitet.Red,
                    entitet.Napomena,
                    entitet.Sezona == null ? null: entitet.Sezona.Id,
                    entitet.Pobjednik == null ? null : entitet.Pobjednik.Id

                     ));
            }));

        }

    }
}
