import { DataContainer } from "@/@types";

export const entityTemplate = ({modelName, props, domain} : DataContainer) => `using System;
using Domain.Shared.Models;

namespace Domain.${domain}.Models
{
  public class ${domain}${modelName} : Model, INamedModel
  {
    public ${domain}${modelName}() : base()
    {
      IdUsuario = Guid.NewGuid();
    }

    public ${domain}${modelName}(Guid idUsuario, string usuario, string nome, string sobrenome, string email, string telefone, string senha, bool mudarSenha, Guid idMvTipoAutenticacao, Guid idRecuperarSenha, string codRecuperarSenha, DateTime? dtRecuperarSenha)
    {
      IdUsuario = idUsuario;
      Usuario = usuario;
      Nome = nome;
      Sobrenome = sobrenome;
      Email = email;
      Telefone = telefone;
      Senha = senha;
      MudarSenha = mudarSenha;
      IdMvTipoAutenticacao = idMvTipoAutenticacao;
      IdRecuperarSenha = idRecuperarSenha;
      CodRecuperarSenha = codRecuperarSenha;
      DtRecuperarSenha = dtRecuperarSenha;
    }

    ${props}
  }
}
`