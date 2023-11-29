﻿using service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Interface
{
    public interface IAuthService
    {
        public Task<bool> auth(SingleSignOn singleSignOn);
    }
}